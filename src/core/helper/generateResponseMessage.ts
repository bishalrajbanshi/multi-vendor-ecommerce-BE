import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateResponseMessage {
  generateCreateMessage(modelName: string) {
    return `${modelName} created successfully`;
  }
  generateUpdateMessage(modelName: string) {
    return `${modelName} updated successfully`;
  }

  genereateApprovalMessage(modelName: string) {
    return `${modelName} status changed successfully`;
  }
  generateDeleteMessage(modelName: string) {
    return `${modelName} deleted successfully`;
  }
  generateFindAllMessage(modelName: string) {
    return `${modelName} fetched successfully`;
  }
  generateFindOneMessage(modelName: string) {
    return `${modelName} fetched successfully`;
  }

  generateSuccessMessage(message: string) {
    return `${message}  successfully`;
  }
  generateErrorMessage(modelName: string) {
    return `${modelName} not found`;
  }
}
