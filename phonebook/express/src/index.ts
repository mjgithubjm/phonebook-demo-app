import { ExpressApplication } from './app/express-application';

const expressApp: ExpressApplication = new ExpressApplication();
expressApp.start(__dirname);