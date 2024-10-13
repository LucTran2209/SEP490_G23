namespace BE.Domain.Abstractions.IRepositories
{
    public interface IBaseRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Find Entity by its Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<TEntity?> FindByIdAsync(Guid id);

        /// <summary>
        /// Add a Entity to Database
        /// </summary>
        /// <param name="entity"></param>
        public Task AddAsync(TEntity entity);

        /// <summary>
        /// Update data of Entity
        /// </summary>
        /// <param name="entity"></param>
        public Task UpdateAsync(TEntity entity);

        /// <summary>
        /// Deactive a Entity
        /// </summary>
        /// <param name="entity"></param>
        public Task DeleteAsync(TEntity entity);
    }
}
