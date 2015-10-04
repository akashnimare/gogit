#! /usr/bin/env node

var github = require('octonode');
var simpleGit = require('simple-git');

var user_login = {
    username: process.argv[2]
};

var client = github.client(user_login);
var ghme = client.me();

client.post('/user/repos', {}, function(err, status, body, headers) {
    ghme.repo({
            "name": process.argv[4]
        },

        function() {
            require('simple-git')()
                .init()
                .add('./*')
                .commit(process.argv[5])
                .addRemote('origin', 'git@github.com:' + process.argv[2] + '/' + process.argv[4] + '.git')
                .push('origin', 'master');
            console.log(process.argv[4] + " created successfully");

        });

});