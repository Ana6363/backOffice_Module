import { MedicalConditionsDto } from "../dtos/MedicalConditionsDto";

export interface MedicalConditionsViewModel {
    title: string;
    description: string;
}

export const mapMedicalConditionsDtoToViewModel = (dto: MedicalConditionsDto): MedicalConditionsViewModel => ({
    title: dto.name,
    description: dto.description,
});