
import { IBoardRepository, CreateBoardInput, BoardDTO } from '../repositories/IBoardRepository';

export class CreateBoardUseCase {
  constructor(private boardRepo: IBoardRepository) {}

  async execute(input: CreateBoardInput): Promise<BoardDTO> {
 
    
    return this.boardRepo.create(input);
  }
}
