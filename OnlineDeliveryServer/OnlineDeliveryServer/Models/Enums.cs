using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineDeliveryServer
{
    public enum UserRole { admin,guest,deliverer}
    public enum OrderState { created, in_progress,completed,canceled}
    public enum UserState { created,verified,declined}
}
