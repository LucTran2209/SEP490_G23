using BE.Domain.Entities.ActivityLogs;
using BE.Domain.Entities.Rentals;
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
        internal const string Groups = nameof(Groups);
        internal const string UserGroups = nameof(UserGroups);
        internal const string Rentals = nameof(Rentals);
        internal const string RentalRequests = nameof(RentalRequests);
        internal const string ActivityLogs = nameof(ActivityLogs);
        internal const string Categories = nameof(Categories);
        internal const string FieldCategories = nameof(FieldCategories);
        internal const string Products = nameof(Products);       
    }
}
