steal(
//  './ods.css',            // application CSS file
    './models/models.js',       // steals all your models
    './ui/welcome/welcome.js',
    './ui/nav/nav.js','jquery/lang/observe/delegate',
    './fixtures/fixtures.js',   // sets up fixtures for your models
    './config.js',
    function(){                 // configure your application
        var mainBox = $('div.main-box');

        var odsState = {
            networking: null,
            servers: [],
            servers_config: null,
            cluster_id: null,
            security: null,
            partition: null,
            feature: null,
            machines: [],
            switches: [],
            snmp: 1,
            adapter_id: null
        };

        var state  = new $.Observe(odsState);

        $('#nav').ods_ui_nav({"mainBox" : mainBox, "odsState" : state});

        mainBox.ods_ui_welcome({ nav: $('#nav').controller(), "mainBox" : mainBox, "odsState" : state });


        if (!window.location.host) {
            $.fixture.on = true;
            state.switches = config.switches;
            state.security = config.security;
            state.networking = config.networking;
        } else {
            var result = {};
            if (window.location.search) {
                // split up the query string and store in an associative array
                var params = window.location.search.slice(1).split("&");
                for (var i = 0; i < params.length; i++) {
                    var tmp = params[i].split("=");
                    result[tmp[0]] = unescape(tmp[1]);
                }
            }

            if (result.server == "fixture") {
                $.fixture.on = true;
            } else {
                $.fixture.on = false;
            }
            if (result.config == "true") {
                state.switches = config.switches;
                state.security = config.security;
                state.networking = config.networking;
            } else if (result.config == "demo") {
	        state.switches = config_demo.switches;
                state.security = config_demo.security;
                state.networking = config_demo.networking;
	    }
        }
    })
