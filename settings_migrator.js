"use strict"

const DefaultSettings = {
	notifierType: "toast",
	processTitle: "TERA",
	iconfile: "tera.png"
}

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    } else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    } else {
		
		if (from_ver + 1 < to_ver) {

            settings = MigrateSettings(from_ver, from_ver + 1, settings);
            return MigrateSettings(from_ver + 1, to_ver, settings);
        }

        switch(to_ver) {			
			case 2:
				delete settings.AFK_TIMEOUT
				settings.processTitle = "TERA"
				settings.iconfile = "tera.png"
				return settings
				break
		}
		
    }
}