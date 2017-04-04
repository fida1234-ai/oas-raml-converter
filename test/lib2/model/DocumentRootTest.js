const expect = require('chai').expect;
const Raml10DocumentRootConverter = require('../../../lib/raml10/Raml10DocumentRootConverter');
const Oas20DocumentRootConverter = require('../../../lib/oas20/Oas20DocumentRootConverter');
const YAML = require('js-yaml');
const Oas = require('../../../lib/importers/swagger');
const Raml = require('../../../lib/importers/baseraml');
const _ = require('lodash');
const fs = require('fs');
const Converter = require('../../../lib/model/converter');
const fileHelper = require('../../../lib/utils/file');

describe.skip('Raml10 to Raml10', () => {
	const testWithData = function (sourceFile, targetFile) {
		return done => {
			const importer = new Raml();
			const promise = importer.loadFile(sourceFile);
			promise.then(() => {
				try {
					const target = YAML.safeLoad(fs.readFileSync(targetFile, 'utf8'));
					const raml10Converter = new Raml10DocumentRootConverter();
					this.data = importer.data;
					const attrRemove = ['typePropertyKind'];
					this.data = Converter.cleanObjectFrom(this.data, attrRemove);
					const model = raml10Converter.import(this.data);
					const result = raml10Converter.export(model);

					expect(result).to.deep.equal(target);
					return done();
				} catch (e) {
					done(e);
				}
			}).catch(err => {
				done(err);
			});
		};
	};

	const baseDir = __dirname + '/../../data2/raml10-raml10/source';
	const testFiles = fs.readdirSync(baseDir);

	testFiles.forEach(function (testFile) {
		if (!_.startsWith(testFile, '.') && fileHelper.pathStartsWith(testFile, 'documentRoot')) {
			const sourceFile = baseDir + '/' + testFile;
			const targetFile = baseDir + '/../target/' + testFile;

			if (process.env.testFile) {
				if (_.endsWith(testFile, process.env.testFile)) {
					it('test: ' + testFile, testWithData(sourceFile, targetFile));
				}
			} else {
				it('test: ' + testFile, testWithData(sourceFile, targetFile));
			}
		}
	});
});

describe('Oas20 to Oas20', () => {
	const testWithData = function (sourceFile, targetFile) {
		return done => {
			const importer = new Oas();
			const promise = importer.loadFile(sourceFile);
			promise.then(() => {
				try {
					const source = YAML.safeLoad(fs.readFileSync(sourceFile, 'utf8'));
					const target = YAML.safeLoad(fs.readFileSync(targetFile, 'utf8'));
					const oas20Converter = new Oas20DocumentRootConverter();
					this.data = importer.data;
					const model = oas20Converter.import(this.data);

					const result = oas20Converter.export(model);
					result.swagger = source.swagger;
					result.paths = {};

					expect(result).to.deep.equal(target);
					return done();
				} catch (e) {
					done(e);
				}
			}).catch(err => {
				done(err);
			});
		};
	};

	const baseDir = __dirname + '/../../data2/oas20-oas20/source';
	const testFiles = fs.readdirSync(baseDir);

	testFiles.forEach(function (testFile) {
		if (!_.startsWith(testFile, '.') && fileHelper.pathStartsWith(testFile, 'documentRoot')) {
			const sourceFile = baseDir + '/' + testFile;
			const targetFile = baseDir + '/../target/' + testFile;

			if (process.env.testFile) {
				if (_.endsWith(testFile, process.env.testFile)) {
					it('test: ' + testFile, testWithData(sourceFile, targetFile));
				}
			} else {
				it('test: ' + testFile, testWithData(sourceFile, targetFile));
			}
		}
	});
});

describe('Raml10 to Oas20', () => {
	const testWithData = function (sourceFile, targetFile) {
		return done => {
			const importer = new Raml();
			const promise = importer.loadFile(sourceFile);
			promise.then(() => {
				try {
					const target = YAML.safeLoad(fs.readFileSync(targetFile, 'utf8'));
					const raml10Converter = new Raml10DocumentRootConverter();
					const oas20Converter = new Oas20DocumentRootConverter();
					this.data = importer.data;
					const attrRemove = ['typePropertyKind'];
					this.data = Converter.cleanObjectFrom(this.data, attrRemove);
					const model = raml10Converter.import(this.data);

					const result = oas20Converter.export(model);
					result.swagger = '2.0';
					result.paths = {};

					expect(result).to.deep.equal(target);
					return done();
				} catch (e) {
					done(e);
				}
			}).catch(err => {
				done(err);
			});
		};
	};

	const baseDir = __dirname + '/../../data2/raml10-oas20/source';
	const testFiles = fs.readdirSync(baseDir);

	testFiles.forEach(function (testFile) {
		if (!_.startsWith(testFile, '.')  && fileHelper.pathStartsWith(testFile, 'documentRoot')) {
			const sourceFile = baseDir + '/' + testFile;
			const targetFile = baseDir + '/../target/' + testFile;

			if (process.env.testFile) {
				if (_.endsWith(testFile, process.env.testFile)) {
					it('test: ' + testFile, testWithData(sourceFile, targetFile));
				}
			} else {
				it('test: ' + testFile, testWithData(sourceFile, targetFile));
			}
		}
	});
});

describe('Oas20 to Raml10', () => {
	const testWithData = function (sourceFile, targetFile) {
		return done => {
			const importer = new Oas();
			const promise = importer.loadFile(sourceFile);
			promise.then(() => {
				try {
					const target = YAML.safeLoad(fs.readFileSync(targetFile, 'utf8'));
					const oas20Converter = new Oas20DocumentRootConverter();
					const raml10Converter = new Raml10DocumentRootConverter();
					this.data = importer.data;
					const model = oas20Converter.import(this.data);

					const result = raml10Converter.export(model);

					expect(result).to.deep.equal(target);
					return done();
				} catch (e) {
					done(e);
				}
			}).catch(err => {
				done(err);
			});
		};
	};

	const baseDir = __dirname + '/../../data2/oas20-raml10/source';
	const testFiles = fs.readdirSync(baseDir);

	testFiles.forEach(function (testFile) {
		if (!_.startsWith(testFile, '.') && fileHelper.pathStartsWith(testFile, 'documentRoot')) {
			const sourceFile = baseDir + '/' + testFile;
			const targetFile = baseDir + '/../target/' + testFile;

			if (process.env.testFile) {
				if (_.endsWith(testFile, process.env.testFile)) {
					it('test: ' + testFile, testWithData(sourceFile, targetFile));
				}
			} else {
				it('test: ' + testFile, testWithData(sourceFile, targetFile));
			}
		}
	});
});