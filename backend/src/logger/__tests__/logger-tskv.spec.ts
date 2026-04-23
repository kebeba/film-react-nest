import { TskvLogger } from '../logger-tskv';

describe('TSKV-format logger testing', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const testMessage = 'Example message';
  const testOptParam = { param_key: 'param_value' };

  it('should properly format log message without optional parameters', () => {
    const message = logger.formatMessage('log', testMessage);

    expect(message).toEqual(
      `logLevel: \"log\"\tmessage: \"${testMessage}\"\tparams: []`,
    );
  });

  it('should properly format log message with optional parameters', () => {
    const message = logger.formatMessage('log', 'Example message', {
      param_key: 'param_value',
    });

    expect(message).toEqual(
      `logLevel: \"log\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"log\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"error\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"warn\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"debug\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"verbose\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
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
      `logLevel: \"fatal\"\tmessage: \"${testMessage}\"\tparams: [{\"param_key\":\"param_value\"}]`,
    );
  });
});
