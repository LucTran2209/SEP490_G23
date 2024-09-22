using FluentValidation.Results;
using FluentValidation;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BE.Api.Extensions;

public static class ValidatorExtension
{
    public static string ValidationResult(this ValidationException validation)
    {
        var failures = validation.Errors
            .Select(error => new Error(error.PropertyName, error.ErrorMessage))
            .ToList();

        var Errors = new Errors()
        {
            ErrorList = failures
        };

        JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString,
        };

        return JsonSerializer.Serialize(Errors, options);
    }

    public class Errors
    {
        public string Status { get; set; } = "400";
        public List<Error>? ErrorList { set; get; }
    }

    public class Error
    {
        public Error(string propertyName, string errorMessage)
        {
            PropertyName = propertyName;
            ErrorMessage = errorMessage;
        }

        public string PropertyName { get; set; } = string.Empty;
        public string ErrorMessage { get; set; } = string.Empty;
    }
}
