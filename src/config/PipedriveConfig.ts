interface IPipedriveConfig {
  baseUrl: string
  token: string;
}

const PipedriveConfig: IPipedriveConfig = {
  token: process.env.PIPEDRIVE_TOKEN || '80dd42c9ae6f6c0eccc53a62a7b85b38f558bcbf',
  baseUrl: process.env.PIPEDRIVE_URL || 'https://journey4.pipedrive.com/api/v1',
};

export default PipedriveConfig;
