require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle(process.env.npm_package_name)
		.setVersion(process.env.npm_package_version)
		.addBearerAuth({
			type: 'apiKey',
			description: 'JWT Authorization via API',
			name: 'Authorization',
			in: 'header',
			scheme: 'bearer',
		})
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
