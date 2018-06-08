var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);

        switch(cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            case 'BFA':
                var bfaTime = new Date('8/13/2018 3:00:00 PM PDT');
                var bfaSeconds = Math.floor(bfaTime / 1000);
                var current = Math.floor(Date.now() / 1000);
                var diffSeconds = bfaSeconds - current;
                var secsRem = diffSeconds % 60;
                var mins = Math.floor(diffSeconds / 60);
                var minsRem = mins % 60
                var hours = Math.floor(mins / 60);
                var hoursRem = hours % 24;
                var days = Math.floor(hours / 24);

                var timeRemaining = days + ' days, ' + hoursRem + ' hours, ' + minsRem + ' minutes, ' + secsRem + ' seconds';
                
                bot.sendMessage({
                    to: channelID,
                    message: 'Time until Battle For Azeroth: ' + timeRemaining + '!'
                });
            break;
            case 'bossquote':
                var quotes = {
                    'Cenarius': 'SACRED VINES!',
                    'Sindragosa': 'Your pathetic magic BETRAYS YOU!',
                    'Coven': 'I WANT TO SEE YOUR LIMBS ROASTING!',
                    'Thorim': 'I remember you... in the mountains..',
                    'Culling': 'To the ends of the earth MalGanis! TO THE ENDS OF THE EARTH!'
                };

                if (args[0] === '-help' || args[0] === '-h') {
                    var bosses = 'The available bosses are: ';

                    for(boss in quotes){
                        bosses += boss + ' ';
                    }

                    bot.sendMessage({
                        to: channelID,
                        message: bosses
                    });
                    break;
                }

                var count = 0;
                var bossName = '';

                for(var quote in quotes){
                    if (Math.random() < 1/++count) {
                        bossName = quote;
                    }
                }

                if(args[0] !== undefined) {
                    bossName = args[0];
                }
                
                bot.sendMessage({
                    to: channelID,
                    message: quotes[bossName]
                });
            break;
         }
     }
});