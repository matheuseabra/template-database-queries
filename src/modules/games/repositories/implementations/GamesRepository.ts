import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder('game').where('game.title like :param', { param }).getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT COUNT(*) FROM games;'); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<any> {
    return this.repository.createQueryBuilder("user").leftJoinAndSelect("games", "game", `game.id = :id`, { id }).getMany();
  }
}
