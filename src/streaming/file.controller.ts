import { Controller, Get, Res } from "@nestjs/common";
import { StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import type { Response } from "express";

@Controller('files')
export class FileController {
    @Get()
    getFile( @Res({passthrough: true}) res: Response): StreamableFile {
        const filePath = join(__dirname, '../../package.json');
        const fileStream = createReadStream(filePath);
        res.set({
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="package.json"',
        });
        return new StreamableFile(fileStream);
    }
}