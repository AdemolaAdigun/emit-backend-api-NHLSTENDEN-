import debug from 'debug';
import http from 'http';
import Q from 'q';
import app from './app';

const DEBUG = debug('dev');
const PORT = process.env.PORT || 8000;

// Handle cloudinary unhandled rejection errors
Q.stopUnhandledRejectionTracking();

process.on('uncaughtException', (error) => {
    DEBUG(`uncaught exception: ${error.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    DEBUG(`unhandled rejection at ${promise} reason: ${reason}`);
    process.exit(1);
});

const index = http.createServer(app);

index.listen(PORT, () => {
    DEBUG(`server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.\npress CTRL-C to stop`);
});
