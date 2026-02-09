import { JsonLogger } from '../json.logger';
import { TskvLogger } from '../tskv.logger';
import { DevLogger } from '../dev.logger';

describe('Loggers', () => {
  describe('JsonLogger', () => {
    let logger: JsonLogger;
    let consoleSpy: jest.SpyInstance;
    let consoleErrorSpy: jest.SpyInstance;

    beforeEach(() => {
      logger = new JsonLogger();
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should output valid JSON format for log()', () => {
      logger.log('test message', 'TestContext');

      const output = consoleSpy.mock.calls[0][0];
      expect(() => JSON.parse(output)).not.toThrow();

      const parsed = JSON.parse(output);
      expect(parsed.level).toBe('log');
      expect(parsed.message).toBe('test message');
    });

    it('should output valid JSON format for error()', () => {
      logger.error('error message', 'trace', 'ErrorContext');

      const output = consoleErrorSpy.mock.calls[0][0];
      expect(() => JSON.parse(output)).not.toThrow();
    });
  });

  describe('TskvLogger', () => {
    let logger: TskvLogger;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      logger = new TskvLogger();
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should output TSKV format (key=value separated by tabs)', () => {
      logger.log('test message', 'TestContext');

      const output = consoleSpy.mock.calls[0][0];

      // Проверяем формат key=value
      expect(output).toMatch(/time=.*\tlevel=log\tmessage=.*/);

      // Проверяем что есть табы как разделители
      expect(output.split('\t').length).toBeGreaterThan(2);
    });

    it('should include context in TSKV format', () => {
      logger.log('test', 'MyContext');

      const output = consoleSpy.mock.calls[0][0];
      expect(output).toContain('context=MyContext');
    });
  });

  describe('DevLogger', () => {
    let logger: DevLogger;
    let processStdoutWriteSpy: jest.SpyInstance;

    beforeEach(() => {
      logger = new DevLogger('Test');

      processStdoutWriteSpy = jest
        .spyOn(process.stdout, 'write')
        .mockImplementation(() => true);
    });

    afterEach(() => {
      processStdoutWriteSpy.mockRestore();
    });

    it('should output plain text (not JSON)', () => {
      logger.log('test message');

      expect(processStdoutWriteSpy).toHaveBeenCalled();

      const output = processStdoutWriteSpy.mock.calls[0][0];

      expect(() => JSON.parse(output)).toThrow();

      expect(output).toContain('test message');
    });
  });
});
