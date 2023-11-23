using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignarR_Simple_Project.Hubs;
using SignarR_Simple_Project.Models;
using System.Diagnostics;

namespace SignarR_Simple_Project.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyhub;

        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyhub)
        {
            _logger = logger;
            _deathlyhub = deathlyhub;
        }

        public IActionResult Index()
        {
            return View();
        }



        // otan xtypame to DeathlyHallows me orisma string paei edw
        // prin kalousame tis methodous apo to hub twra theloume apo ton controller
        // vazoume to parakatw
        // private readonly IHubContext<DeathlyHallowsHub> _deathlyhub;

        // molis enimerwsoume tin timi tou deathluHallo
        // tote erxomaste edw kai stelnoume ena notification se olous tous pelates
        // 
        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DealthyHallowRace.ContainsKey(type))
            {
                SD.DealthyHallowRace[type]++;
            }

            await _deathlyhub.Clients.All.SendAsync("updateDeathlyHallows", SD.DealthyHallowRace[SD.Cloak], SD.DealthyHallowRace[SD.Stone], SD.DealthyHallowRace[SD.Wand]);

            return Accepted();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}