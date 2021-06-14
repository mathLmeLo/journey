interface IMessageBrokerConfig {
  rabbitmq: {
    hostname: string;
    port: number;
    maxRetries: number;
    retryDelay: number;
    default: {
      exchanges: {
        hold: string;
        retry: string;
      };
      queues: {
        wait: string;
      };
    };
    journey: {
      exchanges: {
        primary: string;
        done: string;
      };
      routingKeys: {
        won: string;
        ordered: string;
      };
      queues: {
        won: string;
        ordered: string;
      };
    };
  };
}

const messageBrokerConfig: IMessageBrokerConfig = {
  rabbitmq: {
    maxRetries: process.env.RABBITMQ_MAX_RETRIES ? Number(process.env.RABBITMQ_MAX_RETRIES) : 3,
    retryDelay: process.env.RABBITMQ_RETRY_DELAY ? Number(process.env.RABBITMQ_RETRY_DELAY) : 3000,
    hostname: process.env.RABBITMQ_HOSTNAME || 'amqps://tqaqpsty:a2YbQ3pBNGf23dU25KXBS_GbOJOzNSqh@jackal.rmq.cloudamqp.com/tqaqpsty',
    port: Number(process.env.RABBITMQ_PORT) || 5672,
    default: {
      exchanges: {
        hold: process.env.RABBITMQ_WAIT_EXCHANGE || 'hold_unexpected',
        retry: process.env.RABBITMQ_RETRY_EXCHANGE || 'retry_manager',
      },
      queues: {
        wait: process.env.RABBITMQ_WAIT_QUEUE || 'wait_queue',
      },
    },
    journey: {
      exchanges: {
        primary: process.env.RABBITMQ_JOURNEY_PRIMARY_EXCHANGE || 'journey',
        done: process.env.RABBITMQ_JOURNEY_DONE_EXCHANGE || 'journey_done',
      },
      routingKeys: {
        won: process.env.RABBITMQ_JOURNEY_WON_ROUTINGKEY || 'won',
        ordered: process.env.RABBITMQ_JOURNEY_ORDERED_ROUTINGKEY || 'ordered',
      },
      queues: {
        won: process.env.RABBITMQ_JOURNEY_WON_QUEUE || 'journey_won',
        ordered: process.env.RABBITMQ_JOURNEY_ORDERED_QUEUE || 'journey_ordered',
      },
    },
  },
};

export default messageBrokerConfig;
