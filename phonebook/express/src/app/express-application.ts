import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fs from 'fs';
import * as path from 'path';
export class ExpressApplication {
	app: express.Application = express();

	start(rootPath: string) {
		//enable body parsing middleware
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		//cors
		var corsOptions = {
			origin: '*',
			optionsSuccessStatus: 200
		}
		this.app.use(cors(corsOptions));

		this.app.use('/phonebook-api', this.getRoutes(this.app));
		this.app.listen(8000, () => {
			console.log('Server started!');
		});
	}

	public getRoutes(app: express.Application): express.Router {
		let router = express.Router();

		router.route('/').get(async (request, response) => {
			response.send("ok");
		});

		router.route('/all-contacts').get((request, response) => {
			let dataObject: any = {};
			if (fs.existsSync('./src/assets/contacts.json')) {
				let data: string = fs.readFileSync('./src/assets/contacts.json', 'utf8');
				dataObject = JSON.parse(data);
			} else {
				fs.openSync('./src/assets/contacts.json', 'a');
			}

			response.send({ success: true, data: dataObject });
		});

		router.route('/save-contact-changes').post((request, response) => {
			try {
				let dataObject: any = request.body;
				let data = JSON.stringify(dataObject);
				fs.writeFileSync('./src/assets/contacts.json', data);
				response.send({ success: true });
			} catch (error) {
				response.send({ success: false, error: error });
			}
		});

		return router;
	}
}