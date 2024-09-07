using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BE.Persistence.Common
{
    public static class ConstantTableNames
    {
        internal const string Users = nameof(Users);
        internal const string Roles = nameof(Roles);
        internal const string UserRoles = nameof(UserRoles);
        internal const string RefreshTokens = nameof(RefreshTokens);

        // Table Business
        internal const string Products = nameof(Products);

        internal static string Buildings = nameof(Buildings);
        internal static string Rooms = nameof(Rooms);
        
    }
}
