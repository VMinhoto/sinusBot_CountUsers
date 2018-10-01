/*
Copyright <2018> <Vitor Minhoto>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
registerPlugin({
    name: 'OnlineUsersCounter',
    version: '1.0.0',
    description: 'Displays the Users Online, Admins Online, Mods Online, and Pro Players online in different channels',
    author: 'Vitor Minhoto <vitor.v.minhoto@gmail.com',
    vars: [
        {
            name: 'channelUsersOnline',
            title: 'Channel where Users Online will be displayed',
            type: 'channel'
        },
        {
            name: 'channelAdminsOnline',
            title: 'Channel where Admins Online will be displayed',
            type: 'channel'
        },
        {
            name: 'channelModsOnline',
            title: 'Channel where Mods Online will be displayed',
            type: 'channel'
        },
        {
            name: 'channelProsOnline',
            title: 'Channel where Pro PLayers Online will be displayed',
            type: 'channel'
        },
        {
            name: 'channelUsersOnlineString',
            title: 'Channel name for User count (%x will be replaced by the correct number)',
            type: 'string',
            placeholder: 'Example: [cspacer] Currently online users: %x'
        },
        {
            name: 'channelAdminsOnlineString',
            title: 'Channel name for Admin count (%x will be replaced by the correct number)',
            type: 'string',
            placeholder: 'Example: [cspacer] Currently online Admins: %x'
        },
        {
            name: 'channelModsOnlineString',
            title: 'Channel name for Mod count (%x will be replaced by the correct number)',
            type: 'string',
            placeholder: 'Example: [cspacer] Currently online Mods: %x'
        },
        {
            name: 'channelProsOnlineString',
            title: 'Channel name for Pro Players count (%x will be replaced by the correct number)',
            type: 'string',
            placeholder: 'Example: [cspacer] Currently online Pro PLayers: %x'
        },
        {
            name: 'adminsGroup',
            title: 'Admin Group (ServerGroupID)',
            type: 'string'
        },
        {
            name: 'modsGroup',
            title: 'Mod Group (ServerGroupID)',
            type: 'string'
        },
        {
            name: 'prosGroup',
            title: 'Pro Group (ServerGroupID)',
            type: 'string'
        }
    ]
, function (sinusbot, config) {
     var engine = require('engine');
     var backend = require('backend');
     var event = require('event');
     var store = require('store');

     var playersOnline = backend.getClients();
     var adminsOnlineVar = 0;
     var modsOnlineVar = 0;
     var prosOnlineVar = 0;

     setInterval(function(){
         onlineRefresh();
     },5*1000);

     function onlineRefresh(){
         if (playersOnline != backend.getClients()){
             var channel = backend.getChannelByID(config.channelUsersOnline)
             channel.setName(config.channelUsersOnlineString.replace(/%x/g, playersOnline))
         }

         if (adminsOnlineVar != adminsOnline()){
            var channel = backend.getChannelByID(config.channelAdminsOnline)
            channel.setName(config.channelAdminsOnlineString.replace(/%x/g, adminsOnlineVar))
        }

        if (modsOnline != modsOnline()){
            var channel = backend.getChannelByID(config.channelModsOnline)
            channel.setName(config.channelModsOnlineString.replace(/%x/g, modsOnlineVar))
        }

        if (prosOnline != prosOnline()){
            var channel = backend.getChannelByID(config.channelProsOnline)
            channel.setName(config.channelProsOnlineString.replace(/%x/g, prosOnlineVar))
        }

     }

     


     function adminsOnline(){
         var clients = backend.getClients();
         var admins = 0;

         clients.forEach(function(client) {
             if (hasGroup(client,config.adminsGroup)){
                 admins++
             }
             
         });
         return admins;
     }

     function modsOnline(){
        var clients = backend.getClients();
        var mods = 0;

        clients.forEach(function(client) {
            if (hasGroup(client,config.modsGroup)){
                mods++
            }
            
        });
        return mods;
    }

    function prosOnline(){
        var clients = backend.getClients();
        var pros = 0;

        clients.forEach(function(client) {
            if (hasGroup(client,config.prosGroup)){
                pros++
            }
            
        });
        return pros;
    }

     function hasGroup(client, groups) {
         var boolHasGroup = false;
         client.getServerGroups().forEach(function(group){
             if(groups.indexOf(group.id()) != -1){
                 boolHasGroup = true;
             }
         });

         return boolHasGroup;
     }
    
}}
)