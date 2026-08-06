import cluster from 'cluster';

const NUM_CPUS = parseInt(process.env.NUM_CPUS || '1', 10);
/**
 *@name AppClusterService  
  *@description Service to clusterize the application , This can be used instead of using pm2 or other process managers
  * @example
  * ```typescript 
  * AppClusterService.clusterize(async () => {
  *   await bootstrap();
  * });
  *
  * ```
  * @method clusterize
  * @description Clusters the application using the number of CPUs available ,configurable via the NUM_CPUS environment variable
  * @param {Function} callback - The callback function to be executed in each worker process
  * @returns {void} 


 **/
export const AppClusterService = {
  clusterize(callback: () => void | Promise<void>): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < NUM_CPUS; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker) => {
        // Auto Restart Dead Workers
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  },
};
