using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace TaxiServiceAPI.Data
{
    public class Policies
    {
        public const string Operator = "Operator";
        public const string Driver = "Driver";
        public const string Client = "Client";

        public static AuthorizationPolicy OperatorPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Operator).Build();
        }

        public static AuthorizationPolicy DriverPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Driver).Build();
        }

        public static AuthorizationPolicy ClientPolicy()
        {
            return new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(Client).Build();
        }
    }
}
