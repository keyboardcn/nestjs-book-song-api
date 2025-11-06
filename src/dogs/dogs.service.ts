import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { error } from "console";
import { response } from "express";
import { firstValueFrom, catchError, tap } from "rxjs";

@Injectable()
export class DogsService {
    constructor(private readonly httpService: HttpService) {}
    async getDogs(): Promise<any> {
        let res = await firstValueFrom(
            this.httpService.get('https://dog.ceo/api/breeds/image/random').pipe(
                catchError((error) => {
                    throw 'Error fetching dog image url';
                }),
            )
        );
        const {data} = await firstValueFrom(
            this.httpService.get(res.data.message, {responseType: 'arraybuffer'}).pipe(
                catchError((error) => {
                    throw 'Error fetching dog image';
                }),
            )
        )
        return data;
    }
}