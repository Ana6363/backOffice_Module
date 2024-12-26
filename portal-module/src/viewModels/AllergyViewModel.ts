import { AllergyDto } from '../dtos/AllergyDto';

export interface AllergyViewModel {
    title: string; // "title" replaces "name" for display purposes
    description: string;
}

export const mapAllergyDtoToViewModel = (dto: AllergyDto): AllergyViewModel => ({
    title: dto.name,
    description: dto.description,
});
