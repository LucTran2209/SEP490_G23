namespace BE.Domain.Abstractions.IRepositories
{
    public interface IBaseRepository<TEntity, in TKey> where TEntity : class
    {
        /// <summary>
        /// Find Entity by its Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<TEntity> FindByIdAsync(TKey id);

        /// <summary>
        /// Add a Entity to Database
        /// </summary>
        /// <param name="entity"></param>
        public void Insert(TEntity entity);

        /// <summary>
        /// Update data of Entity
        /// </summary>
        /// <param name="entity"></param>
        public void Update(TEntity entity);

        /// <summary>
        /// Deactive a Entity
        /// </summary>
        /// <param name="entity"></param>
        public void Delete(TEntity entity);
    }
}
