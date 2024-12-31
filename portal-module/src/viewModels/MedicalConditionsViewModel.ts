import { MedicalConditionsDto } from "../dtos/MedicalConditionsDto";

export interface MedicalConditionsViewModel {
    name: string;
    description: string;
}

export const mapMedicalConditionsDtoToViewModel = (dto: MedicalConditionsDto): MedicalConditionsViewModel => ({
    name: dto.name,
    description: dto.description,
});