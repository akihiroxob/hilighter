import gulp    from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import { webpack as config } from '../config';

gulp.task('webpack', () => {
    return webpackStream(config, webpack)
        .on('error', function(e) { this.emit('end'); })
        .pipe(gulp.dest(config.output.publicPath));
});
