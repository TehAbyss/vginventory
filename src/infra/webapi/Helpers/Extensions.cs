using System;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace VgInventory.Infra.WebApi
{
    public static class Extensions 
    {
        public static DateTime FromUnixTimeToDateTime(this long unixTime)
        {
            var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
            return epoch.AddSeconds(unixTime);
        }

        public static long ToUnixTime(this DateTime date)
        {
            return (date.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
        }

        public static bool IsValidEmail(this string email)
        {
            if (email != null)
            {
                // this check is needed because "Joe Smith <email@example.com>" is a valid email address
                if (!email.Contains(" "))
                {
                    return new EmailAddressAttribute().IsValid(email);
                }
            }

            return false;
        }

        public static bool IsValidUserName(this string userName)
        {
            /**
                Rules for user name:
                - Usernames must be at least 6 and at most 20 characters
                - Usernames can consist of alphanumeric characters
                - Usernames can consist of lowercase and capitals
                - Usernames can consist of one underscore, hyphen, period, or space
                - Cannot be multiple underscores, hyphens, periods, or spaces
                - Cannot have a underscore, hyphen, period, or space at the start or end
            **/
            if (userName != null && userName.Length >= 6 && userName.Length <= 20) {
                string pattern = @"^[a-zA-Z0-9]+(_|-|\.| )??[a-zA-Z0-9]+$";
                return Regex.Match(userName, pattern, RegexOptions.Compiled).Success;
            }

            return false;
        }
    }
}
