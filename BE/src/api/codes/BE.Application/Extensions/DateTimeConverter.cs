namespace BE.Application.Extensions
{
    public static class DateTimeConverter
    {
        public static DateTime CurrentTimeZone(this DateTime date)
        {
            TimeZoneInfo tz = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            date = TimeZoneInfo.ConvertTime(date, tz);

            return date;
        }
    }
}
