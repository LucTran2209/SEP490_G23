//using MediatR;
//using BE.Domain;

//namespace BE.Infrastructure.EFcore.Extensions;

//public static class MediatRExtensions
//{
//    public static async Task DispatchDomainEvents(this IMediator mediator, ApplicationDbContext ctx)
//    {
//        var domainEntities = ctx.ChangeTracker
//            .Entries<BaseEntity>()
//            .Where(x => x.Entity.DomainEvents != null && x.Entity.DomainEvents.Any());

//        var domainEvents = domainEntities
//            .SelectMany(x => x.Entity.DomainEvents)
//            .ToList();

//        domainEntities.ToList()
//            .ForEach(entity => entity.Entity.ClearDomainEvents());

//        foreach (var domainEvent in domainEvents)
//        {
//            await mediator.Publish(domainEvent);
//        }
//    }
//}
