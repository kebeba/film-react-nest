import { JsonLogger } from '../logger-json';

describe('JSON-format logger testing', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testMessage = 'Example message';
  const testOptParam = { param_key: 'param_value' };

  it('should properly format log message without optional parameters', () => {
    const message = logger.formatMessage('log', testMessage);

    expect(message).toEqual(
      JSON.stringify({
        level: 'log',
        message: testMessage,
        optionalParams: [],
      }),
    );
  });

  it('should properly format log message with optional parameters', () => {
    const message = logger.formatMessage('log', 'Example message', {
      param_key: 'param_value',
    });

    expect(message).toEqual(
      JSON.stringify({
        level: 'log',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with log level message', () => {
    const consoleMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    logger.log(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with error level message', () => {
    const consoleMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    logger.error(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'error',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with warning level message', () => {
    const consoleMock = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    logger.warn(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'warn',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with debug level message', () => {
    const consoleMock = jest
      .spyOn(console, 'debug')
      .mockImplementation(() => undefined);

    logger.debug(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'debug',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with verbose level message', () => {
    const consoleMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    logger.verbose(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'verbose',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });

  it('should properly call console with fatal level message', () => {
    const consoleMock = jest
      .spyOn(console, 'log')
      .mockImplementation(() => undefined);

    logger.fatal(testMessage, testOptParam);

    expect(consoleMock).toHaveBeenCalled();
    expect(consoleMock).toHaveBeenCalledTimes(1);
    expect(consoleMock).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'fatal',
        message: testMessage,
        optionalParams: [testOptParam],
      }),
    );
  });
});
