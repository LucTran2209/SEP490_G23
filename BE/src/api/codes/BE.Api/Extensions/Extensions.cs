﻿using BE.Api.Middlewares;
using Microsoft.IdentityModel.Tokens;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace BE.Api.Extensions;

public static class Extensions
{
    private static readonly string encryptionFileName = "encryption-certificate.pfx";
    private static readonly string signingFileName = "signing-certificate.pfx";

    public static IServiceCollection AddHostServices(this IServiceCollection services, IWebHostEnvironment configuration)
    {
        var securiryKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("b14ca5898a4e4133bbce2ea2315a1916"));

        services.AddRazorPages();

        services.AddControllers();
        //services.ConfigureOptions<ConfigureJsonOptions>();

        services.AddScoped<ExceptionHandlingMiddleware>();
        services.AddHttpContextAccessor();
        services.AddTransient(s => s.GetRequiredService<IHttpContextAccessor>().HttpContext?.User ?? new ClaimsPrincipal());

        return services;
    }

    private static X509Certificate2 GetX509Certificate(
        string distinguishedName,
        X509KeyUsageFlags keyUsageFlags = X509KeyUsageFlags.KeyEncipherment,
        string password = default!)
    {
        using var store = new X509Store(StoreName.My, StoreLocation.CurrentUser);
        store.Open(OpenFlags.ReadWrite | OpenFlags.OpenExistingOnly);

        var subject = new X500DistinguishedName(distinguishedName);

        var certificate = store.Certificates
            .OfType<X509Certificate2>()
            .FirstOrDefault(x => x.SubjectName == subject);

        if (certificate != null && (certificate.NotBefore > DateTime.Now || certificate.NotAfter < DateTime.Now))
        {
            store.Remove(certificate);
            certificate = null;
        }

        if (certificate != null) return certificate;

        using var algorithm = RSA.Create(keySizeInBits: 2048);

        var request = new CertificateRequest(subject, algorithm, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        request.CertificateExtensions.Add(new X509KeyUsageExtension(keyUsageFlags, critical: true));

        certificate = request.CreateSelfSigned(DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddYears(2));

        var data = certificate.Export(X509ContentType.Pfx, string.Empty);

        var flags = X509KeyStorageFlags.PersistKeySet
            | X509KeyStorageFlags.MachineKeySet;

        // Note: macOS requires marking the certificate private key as exportable.
        // If this flag is not set, a CryptographicException is thrown at runtime.
        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            flags |= X509KeyStorageFlags.Exportable;
        }

        certificate = new X509Certificate2(data, password, flags);

        store.Add(certificate);
        store.Close();
        return certificate;
    }

    private static X509Certificate2 GetX509Certificate(
        this IWebHostEnvironment configuration,
        string fileName,
        string distinguishedName,
        X509KeyUsageFlags keyUsageFlags = X509KeyUsageFlags.KeyEncipherment,
        string password = default!)
    {
        string filePath = Path.Combine(configuration.ContentRootPath, fileName);
        var flags = X509KeyStorageFlags.PersistKeySet
                | X509KeyStorageFlags.MachineKeySet;

        // Note: macOS requires marking the certificate private key as exportable.
        // If this flag is not set, a CryptographicException is thrown at runtime.
        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
        {
            flags |= X509KeyStorageFlags.Exportable;
        }

        if (File.Exists(filePath))
        {
            var certificate = new X509Certificate2(File.ReadAllBytes(filePath), password, flags);

            if (certificate != null && (certificate.NotBefore > DateTime.Now || certificate.NotAfter < DateTime.Now))
            {
                certificate = null;
            }

            if (certificate != null) return certificate;
        }

        using var algorithm = RSA.Create(keySizeInBits: 2048);
        var subject = new X500DistinguishedName(distinguishedName);
        var request = new CertificateRequest(subject, algorithm, HashAlgorithmName.SHA256, RSASignaturePadding.Pkcs1);
        request.CertificateExtensions.Add(new X509KeyUsageExtension(keyUsageFlags, critical: true));

        var data = request
            .CreateSelfSigned(DateTimeOffset.UtcNow, DateTimeOffset.UtcNow.AddYears(2))
            .Export(X509ContentType.Pfx, password ?? string.Empty);

        File.WriteAllBytes(filePath, data);

        return new X509Certificate2(data, password, flags);
    }
}