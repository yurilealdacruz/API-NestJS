import { FileService } from '../file/file.service';

export const FileServiceMock = {
  provide: FileService,
  useValue: {
    getDestinationPath: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
