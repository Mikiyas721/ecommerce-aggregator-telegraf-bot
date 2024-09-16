import {UserRepo} from "../../domain/ports/user_repo";
import {Either, SimpleFailure, Failure, Success} from "telegraf-721";
import {User} from "../../domain/entities/user";
import {UserRemoteDatasource} from "../datasources/user_remote_datasource";
import {UserDto} from "../dtos/user_dto";

export class UserRepoImpl implements UserRepo {
    constructor(private userRemoteDatasource: UserRemoteDatasource) {
    }

    async fetchUserByTelegramId(telegramId: string, fetchAllFields: boolean): Promise<Either<Failure, Success<User[]>>> {
        const fields = fetchAllFields ? undefined : ["id"]

        const usersResponse = await this.userRemoteDatasource.restDatasource.get({
            url: this.userRemoteDatasource.myPath,
            params: {
                filter: JSON.stringify({
                    where: {telegramId: telegramId},
                    fields
                })
            }
        });

        return usersResponse.fold(
            l => Either.left(l),
            r => Either.right(new Success(r.value.map((value: any) => {
                return UserDto.fromJson(value).toDomain().getSome()
            })))
        );
    }

    async fetchUserByPhone(phone: string): Promise<Either<Failure, Success<User[]>>> {
        const usersResponse = await this.userRemoteDatasource.restDatasource.get({
            url: this.userRemoteDatasource.myPath,
            params: {
                filter: JSON.stringify({
                    where: {phone},
                })
            }
        });

        return usersResponse.fold(
            l => Either.left(l),
            r => Either.right(new Success(r.value.map((value: any) => {
                return UserDto.fromJson(value).toDomain().getSome()
            })))
        );
    }

    async registerUser(user: User): Promise<Either<Failure, User>> {
        const usersResponse = await this.userRemoteDatasource.restDatasource.post({
            url: `${this.userRemoteDatasource.myPath}`,
            data: UserDto.fromDomain(user).toJson()
        });

        return usersResponse.fold(
            l => Either.left(l),
            r => UserDto.fromJson(r.value).toDomain().fold(
                () => Either.left(new SimpleFailure("Unable to map dto to domain")),
                s => Either.right(s)
            )
        );
    }

    async updateUserTelegramId(id: string, telegramId: string): Promise<Either<Failure, User>> {
        const usersResponse = await this.userRemoteDatasource.restDatasource.patch({
            url: `${this.userRemoteDatasource.myPath}/${id}`,
            data: {
                telegramId
            }
        });

        return usersResponse.fold(
            l => Either.left(l),
            r => Either.right(UserDto.fromJson(r.value).toDomain().getSome())
        );
    }
}
