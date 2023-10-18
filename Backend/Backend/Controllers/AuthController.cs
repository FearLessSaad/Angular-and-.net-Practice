using Backend.Context;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _dbContext;
        public AuthController(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] Login user)
        {
            if(user == null)
                return BadRequest();
            var usr = _dbContext.Users.FirstOrDefaultAsync(x=> x.user_name == user.username && x.password == user.password);
            if(usr.Result == null)
                return NotFound(new { Message = "User Is Not Found!" });

            var token = CreateJwtToken(usr.Result);

            return Ok(new {
                Token = token,
                Message = "Login Successfull!"
            });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User userObj)
        {
            if (userObj == null) return BadRequest();

            if (await _dbContext.Users.AnyAsync(x=>x.user_name == userObj.user_name)) return BadRequest(new { Message = "User Already Exists!" });
            if (await _dbContext.Users.AnyAsync(x => x.email == userObj.email)) return BadRequest(new { Message = "Email Already Exists!" });

            userObj.role = "user";
            userObj.token = "";

            await _dbContext.Users.AddAsync(userObj);
            await _dbContext.SaveChangesAsync();

            return Ok(new
            {
                Message = "Registered Successfully!"
            });
        }

        private string CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("cgkrgfdgf4dgf%fdg4^fgd^436Bdfg64fd3Hgfdt4654hfg5&^rrFGdge45^2gbDFfdhgfde^436");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.role),
                new Claim(ClaimTypes.Name, user.user_name)
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [Authorize]
        [HttpGet("Users")]
        public async Task<ActionResult<apiUsers>> GetAllUsers()
        {
            return Ok(await _dbContext.Users.ToListAsync());
        }
    }
}
