import { AllergyDto } from '../dtos/AllergyDto';

export interface AllergyViewModel {
    name: string;
    description: string;
}

export const mapAllergyDtoToViewModel = (dto: AllergyDto): AllergyViewModel => ({
    name: dto.name,
    description: dto.description,
});
