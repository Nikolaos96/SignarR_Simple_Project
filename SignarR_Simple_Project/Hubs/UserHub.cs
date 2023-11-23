using Microsoft.AspNetCore.SignalR;

namespace SignarR_Simple_Project.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        /////////////////////////////////////////
        // oi leitourgies autes einai enswmatomenes
        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            // edw perimenoume prin proxwrisoume sti epomeni grammh
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            // edw perimenoume prin proxwrisoume sti epomeni grammh
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }
        //////////////////////////////////////////

        public async Task<string> NewWindowLoaded(string name)
        {
            TotalViews++;
            // kalei thn updateTotalViews pou einai mesa sto userCOunt.js
            // sinexizei na ekteleitai o kwdikas....den mplokarete oso perimenei
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
            return $"total views from {name} - {TotalViews}";
        }
    }
}
