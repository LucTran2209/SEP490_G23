export interface SubcategoryInputDto{
    id: string | null,
    categoryId: string,
    subCategoryName: string,
    description: string
}
export interface CategoryInputDto{
    id: string | null,
    categoryName: string,
}
export interface SubcategoryOutputDto{
    id: string;
    subCategoryName: string;
    description?: string;
}
export interface CategoryOutputDto {
  id: string;
  categoryName: string;
  subCategories: SubcategoryOutputDto[];
}
export interface CategoryResultService {
  statusCode: string;
  message: string;
  data: CategoryOutputDto[];
}

export interface Category {
  id: string;
  categoryName: string;
}
export interface Subcategory {
  subCategoryName: string;
  description: string;
  categoryId: string;
  category: Category| string |null;
  products: any[];
  id: string;
  createdBy: string | null;
  createdByName: string | null;
  modifiedBy: string | null;
  modifiedByName: string | null;
  createdDate: string;
  lastModifiedDate: string | null;
  isDeleted: boolean;
}

export interface SubCategoryResultService {
  statusCode: string;
  message: string;
  data: Subcategory[];
}

//namnh

