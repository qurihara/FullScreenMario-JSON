window.FullScreenMario = (function() {
    "use strict";
    
    // Use an EightBittr as the class parent, with EightBittr's constructor
    var EightBitter = new EightBittr(),
        
        // Used for combining arrays from the prototype to this
        proliferate = EightBitter.proliferate,
        proliferateHard = EightBitter.proliferateHard;
        
    console.warn("Still using global player object...");    
    /**
     * 
     */
    function FullScreenMario() {            // Call the parent EightBittr constructor to set the base settings,        // verify the prototype requirements, and call the reset functions        EightBittr.call(this, {
            "constructor": FullScreenMario,            "unitsize": 4,            "scale": 2,            "requirements": {                "global": {                    "AudioPlayr": "src/AudioPlayr.js",                    "ChangeLinr": "src/ChangeLinr.js",                    "FPSAnalyzr": "src/FPSAnalyzr.js",                    "GamesRunnr": "src/GamesRunnr.js",                    "GroupHoldr": "src/GroupHoldr.js",                    "InputWritr": "src/InputWritr.js",                    "MapScreenr": "src/MapScreenr.js",
                    "MapsHandlr": "src/MapsHandlr.js",
                        "MapsManagr": "src/MapsManagr.js",
                    "ModAttachr": "src/ModAttachr.js",                    "ObjectMakr": "src/ObjectMakr.js",                    "PixelDrawr": "src/PixelDrawr.js",                    "PixelRendr": "src/PixelRendr.js",                    "QuadsKeepr": "src/QuadsKeepr.js",                    "StatsHoldr": "src/StatsHoldr.js",                    "StringFilr": "src/StringFilr.js",                    "ThingHittr": "src/ThingHittr.js",                    "TimeHandlr": "src/TimeHandlr.js"                },                "self": {
                    "audio": "settings/audio.js",
                    "collisions": "settings/collisions.js",                    "events": "settings/events.js",
                    "maps": "settings/maps.js",                    "quadrants": "settings/quadrants.js",
                    "runner": "settings/runner.js",
                    "screen": "settings/screen.js",
                    "sprites": "settings/sprites.js",
                    "statistics": "settings/statistics.js"                }            },            "resets": [
                resetPixelRender,                resetPixelDrawer,                resetTimeHandler,
                resetAudioPlayer,
                resetQuadsKeeper,
                resetGamesRunner,
                resetStatsHolder,
                resetThingHitter,
                resetObjectMaker,
                resetMapScreener,
                resetMapsCreator,
                resetMapsHandler,
                resetInputWriter,
                resetModAttacher,
                startModAttacher,
            ],
            "constants": [
                "unitsize",
                "scale",
                "jumplev1",
                "jumplev2",
                "ceillev",
                "ceilmax",
                "castlev",
                "point_levels"
            ]        });    }
    FullScreenMario.prototype = EightBitter;
    
    // For the sake of reset functions, store constants as members of the actual
    // FullScreenMario function itself
    FullScreenMario.unitsize = 4;
    FullScreenMario.scale = 2;
    FullScreenMario.jumplev1 = 32;
    FullScreenMario.jumplev2 = 64;
    // The floor is 88 spaces (11 blocks) below the yloc = 0 level
    FullScreenMario.ceillev = 88; 
    // The floor is 104 spaces (13 blocks) below the top of the screen (yloc = -16)
    FullScreenMario.ceilmax = 104; 
    FullScreenMario.castlev = -48;
    // When a player is 48 spaces below the bottom, kill it
    FullScreenMario.bottom_death_difference = 48;
    // Levels of points to award for hopping on / shelling enemies
    FullScreenMario.point_levels = [
        100, 200, 400, 500, 800, 1000, 2000, 4000, 5000, 8000
    ];            /* Reset functions, in order    */        /**     * Sets self.PixelRender     *      * @param {FullScreenMario} self     * @remarks Requirement(s): PixelRendr (src/PixelRendr.js)
     *                          sprites.js (settings/sprites.js)     */    function resetPixelRender(self) {        // PixelRender settings are stored in FullScreenMario.prototype.sprites,        // though they also need the scale measurement added        self.PixelRender = new PixelRendr(proliferateHard({
            "scale": self.scale
        }, self.sprites));    }        /**     * Sets self.PixelDrawer     *      * @param {FullScreenMario} self     * @remarks Requirement(s): PixelDrawr (src/PixelDrawr.js)     */    function resetPixelDrawer(self) {        self.PixelDrawer = new PixelDrawr({            "PixelRender": self.PixelRender        });    }        /**     * Sets self.TimeHandler     *      * @param {FullScreenMario} self     * @remarks Requirement(s): TimeHandlr (src/TimeHandlr.js)
     *                          events.js (settings/events.js)     */    function resetTimeHandler(self) {
        self.TimeHandler = new TimeHandlr(proliferate({
            "classAdd": self.addClass,
            "classRemove": self.removeClass
        }, self.events));    }
    
    /**
     * Sets self.AudioPlayer
     * 
     * @param {FullScreenMario} self
     * @remarks Requirement(s): AudioPlayr (src/AudioPlayr.js)
     *                          audio.js (settings/audio.js)
     */
    function resetAudioPlayer(self) {
        self.AudioPlayer = new AudioPlayr(self.audio);
    }
    
    /**
     * Sets self.QuadsKeeper
     * @remarks Requirement(s): QuadsKeepr (src/QuadsKeepr.js)
     *                          quadrants.js (settings/quadrants.js)
     */
    function resetQuadsKeeper(self) {
        self.QuadsKeeper = new QuadsKeepr(self.quadrants);
    }
    
    /**
     * Sets self.GamesRunner
     * @remarks Requirement(s): GamesRunnr (src/GamesRunnr.js)
     *                          runner.js (settings/runner.js)
     */
    function resetGamesRunner(self) {
        self.GamesRunner = new GamesRunnr(proliferate({
            "scope": self,
        }, self.runner));
    }
    
    /**
     * Sets self.StatsHolder
     * @remarks Requirement(s): StatsHoldr (src/StatsHoldr.js)
     *                          statistics.js (settings/statistics.js)
     */
    function resetStatsHolder(self) {
        self.StatsHolder = new StatsHoldr(self.statistics);
    }
    
    /**
     * Sets self.ThingHitter
     * @remarks Requirement(s): ThingHittr (src/ThingHittr.js)
     *                          collisions.js (settings/collisions.js)
     */
    function resetThingHitter(self) {
        self.ThingHitter = new ThingHittr(proliferate({
            "scope": self
        }, self.collisions));
        self.GroupHolder = self.ThingHitter.getGroupHolder();
    }
    
    /**
     * Sets self.ObjectMaker
     * 
     * Because many Thing functions require access to other FSM modules, each is
     * given a reference to this container FSM via properties.Thing.EightBitter. 
     * 
     * @remarks Requirement(s): ObjectMakr (src/ObjectMakr.js)
     *                          things.js (settings/things.js)
     */
    function resetObjectMaker(self) {
        // self.ObjectMaker = new ObjectMakr(proliferate({
            // "properties": {
                // "Thing": {
                    // "EightBitter": self
                // }
            // }
        // }, self.things));
    }
    
    /**
     * Sets self.MapScreener
     * 
     * @remarks Requirement(s): MapScreenr (src/MapScreenr.js)
     *                          screen.js (settings/screen.js)
     */
    function resetMapScreener(self) {
        self.MapScreener = new MapScreenr(proliferate({
            "unitsize": FullScreenMario.unitsize,
            "width": window.innerWidth,
            "height": window.innerHeight
        }, self.screen));
    }
    
    /**
     * Sets self.MapCreator
     * 
     * @remarks Requirement(s): MapCreatr (src/MapCreatr.js)
     *                          maps.js (settings/maps.js)
     */
    function resetMapsCreator(self) {
        self.MapsCreator = new MapsCreatr({
            "ObjectMaker": new ObjectMakr(self.maps.ObjectMaker),
            "group_types": ["Character", "Scenery", "Solid", "Text"],
            "macros": self.macros
        });
    }
    
    /**
     * Sets self.MapsHandler
     * 
     * @remarks Requirement(s): MapsHandlr (src/MapsHandlr.js)
     *                          maps.js (settings/maps.js)
     */
    function resetMapsHandler(self) {
        self.MapsHandler = new MapsHandlr({
            "MapsCreator": self.MapsCreator,
            "MapScreener": self.MapScreener,
            "screen_attributes": self.maps.screen_attributes
        });
    }
    
    /**
     * Sets self.InputWriter
     * 
     * @remarks Requirement(s): InputWritr (src/InputWritr.js)
     *                          input.js (settings/input.js)
     */
     // also fpsanalyzr from gamesrunnr
    function resetInputWriter(self) {
        self.InputWriter = new InputWritr(self.input);
    }
    
    /**
     * 
     */
    function resetModAttacher(self) {
        self.ModAttacher = new ModAttachr(proliferate({
            "scope_default": self
        }, self.mods));
    }
    
    /** 
     * 
     */
    function startModAttacher(self) {
        self.ModAttacher.fireEvent("onReady", self, self);
    }
    
    
    /* Global manipulations
    */
    
    /**
     * 
     * 
     * 
     */
    function addThing(thing, left, top) {
        if(typeof(thing) === "string" || thing instanceof String) {
            thing = this.ObjectMaker.make(thing);
        }
        
        if(arguments.length > 1) {
            thing.EightBitter.setLeft(thing, left);
            thing.EightBitter.setTop(thing, top);
        }
        thing.EightBitter.updateSize(thing);
        
        thing.EightBitter.GroupHolder.getFunctions().add[thing.grouptype](thing);
        thing.placed = true;
        
        if(thing.onadding) {
            thing.onadding(thing);
        }
        
        thing.EightBitter.PixelDrawer.setThingSprite(thing);
        
        return thing;
    }
    
    /**
     * 
     */
    function scrollWindow(dx, dy) {
        dx = dx || 0;
        dy = dy || 0;
        
        this.MapScreener.shift(dx, dy);
        this.shiftAll(-dx, -dy);
        
        // update quadrants
        this.shiftThings(this.QuadsKeeper.getQuadrants(), -dx, -dy);
        this.QuadsKeeper.updateQuadrants(-dx);
    }
    
    
    /* Collision detectors
    */

    /**
     * Generic checker for can_collide, used for both Solids and Characters
     * 
     * @param {Thing} thing
     * @return {Boolean}
     */
    function thingCanCollide(thing) {
        return thing.alive && !thing.nocollide;
    }

    /**
     * Generic base function to check if one thing is touching another
     * This will be called by the more specific thing touching functions
     * 
     * @param {Thing} thing
     * @param {Thing} other
     * @return {Boolean}
     * @remarks Only the horizontal checks use unitsize
     */
    function thingTouchesThing(thing, other) {        return !thing.nocollide && !other.nocollide
                && thing.right - this.unitsize > other.left
                && thing.left + this.unitsize < other.right
                && thing.bottom >= other.top
                && thing.top <= other.bottom;
    }
    
    /**
     * Is thing on top of other?
     * 
     * 
     * @remarks This is a more specific form of thingTouchesThing
     */
    function thingOnTop(thing, other) {
        // If thing is a solid and other is falling, thing can't be above other
        if(thing.grouptype === "Solid" && other.yvel > 0) {
            return false;
        }
        
        // If other is falling faster than thing, and isn't a solid,
        // thing can't be on top (if anything, the opposite is true)
        if(thing.yvel < other.yvel && other.grouptype !== "Solid") {
            return false;
        }
        
        // If thing is the player, and it's on top of an enemy, that's true
        if(thing.player && thing.bottom < other.bottom 
                && other.type === "enemy") {
            return true;
        }
        
        // If thing is too far to the right, it can't be touching other
        if(thing.left + this.unitsize >= other.right) {
            return false;
        }
        
        // If thing is too far to the left, it can't be touching other
        if(thing.right - this.unitsize <= other.left) {
            return false;
        }
        
        // If thing's bottom is below other's top, factoring tolerance and
        // other's vertical velocity, they're touching
        if(thing.bottom <= other.top + other.toly + other.yvel) {
            return true;
        }
        
        // Same as before, but with velocity as the absolute difference between
        // their two velocities
        if(thing.bottom <= other.top + other.toly
                + Math.abs(thing.yvel - other.yvel)) {
            return true;
        }
        
        // None of the above checks passed for true, so this is false (thing's
        // bottom is above other's top
        return false;
    }
    
    /**
     * 
     * 
     * @remarks Similar to thingOnTop, but more specifically used for
     *          characterOnSolid and characterOnResting
     */
    function thingOnSolid(thing, other) {
        // If thing is too far to the right, they're not touching
        if(thing.left + this.unitsize > other.right) {
            return false;
        }
        
        // If thing is too far to the left, they're not touching
        if(thing.right - this.unitsize < other.left) {
            return false;
        }
        
        // If thing's bottom is below other's top, factoring thing's velocity
        // and other's tolerance, they're touching
        if(thing.bottom - thing.yvel <= other.top + other.toly + thing.yvel) {
            return true;
        }
        
        // Same as before, but with velocity as the absolute difference between
        // their two velocities
        if(thing.bottom <= other.top + other.toly
                + Math.abs(thing.yvel - other.yvel)) {
            return true;
        }
        
        // None of the above checks passed for true, so this is false (thing's
        // bottom is above other's top
        return false;
    }
    
    /**
     * 
     */
    function characterOnSolid(character, solid) {
        // If character is resting on solid, this is automatically true
        if(character.resting === solid) {
            return true;
        }                // If the character is jumping upwards, it's not on a solid        // (removing this check would cause Mario to have "sticky" behavior when        // jumping at the corners of solids)        if(character.yvel < 0) {            return false;        }
        
        // The character and solid must be touching appropriately
        if(!this.thingOnSolid(character, solid)) {
            return false;
        }
        
        // Corner case: when character is exactly falling off the right (false)
        if(character.left + character.xvel + this.unitsize == solid.right) {
            return false;
        }
        
        // Corner case: when character is exactly falling off the left (false)
        if(character.right - character.xvel - this.unitsize == solid.left) {
            return false;
        }
        
        // None of the above checks caught a falsity, so this must be true
        return true;
    }
    
    /**
     * 
     */
    function characterOnResting(character, solid) {
        if(!this.thingOnSolid(character, solid)) {
            return false;
        }
        
        // Corner case: when character is exactly falling off the right (false)
        if(character.left + character.xvel + this.unitsize == solid.right) {
            return false;
        }
        
        // Corner case: when character is exactly falling off the left (false)
        if(character.right - character.xvel - this.unitsize == solid.left) {
            return false;
        }
        
        // None of the above checks caught a falsity, so this must be true
        return true;
    }
    
    /**
     * 
     * @param {Thing} thing
     * @param {Thing} other
     */
    function characterTouchesSolid(character, solid) {        // Hidden solids can only be touched by the player bottom-bumping them
        if(solid.hidden) {            if(!character.player || !this.solidOnCharacter(solid, character)) {                return;            }
        }
        
        return this.thingTouchesThing(character, solid);
    }

    /**
     * 
     * @param {Thing} thing
     * @param {Thing} other
     */
    function characterTouchesCharacter(thing, other) {
        
        return this.thingTouchesThing(thing, other);
    }

    /**
     * // thing = character
     * // other = solid
     * 
     * @param {Thing} thing
     * @param {Thing} other
     */
    function characterHitsSolid(thing, other) {
        // "Up" solids are special (they kill things that aren't their .up)
        if(other.up && thing !== other.up) {
            return characterTouchesUp(thing, other);
        }
        
        // Normally, call the generic ~TouchedSolid function
        (other.collide || characterTouchedSolid)(thing, other);
        
        // If a character is bumping into the bottom, call that
        if(thing.undermid) {
            if(thing.undermid.bottomBump) {
                thing.undermid.bottomBump(thing.undermid, thing);
            }
        }
        else if(thing.under && thing.under.bottomBump) {
            thing.under.bottomBump(thing.under, thing);
        }
    }

    /**
     *  
     * @param {Thing} thing
     * @param {Thing} other
     */
    function characterHitsCharacter(thing, other) {
        // The player calls the other's collide function, such as playerStar
        if(thing.player) {
            if(other.collide) {
                return other.collide(thing, other);
            }
        }
        // Otherwise just use thing's collide function
        else if(thing.collide) {
            thing.collide(other, thing);
        }
    }
    
    /**
     * 
     * 
     * @remarks Similar to thingOnTop, but more specifically used for
     *          characterTouchedSolid
     * @remarks This sets the character's .midx property
     */    // function solidOnCharacter(thing, other) {
    function solidOnCharacter(solid, character) {        // This can never be true if character is falling
        if(character.yvel >= 0) {
            return false;
        }
        
        // Horizontally, all that's required is for the character's midpoint to
        // be within the solid's left and right
        character.midx = this.getMidX(character);
        if(character.midx <= solid.left || character.midx >= solid.right) {
            return false;
        }
        
        // If the solid's bottom is below the character's top, factoring
        // tolerance and velocity, that's false (this function assumes they're
        // already touching)
        if(solid.bottom - solid.yvel                > character.top + character.toly - character.yvel) {
            return false;
        }                // The above checks never caught falsities, so this must be true
        return true;
    }
    
    /**
     * 
     */
    function characterAboveEnemy(thing, other) {
        return thing.bottom < other.top + other.toly;
    }
    

    /* Physics functions 
    */
    
    /**
     * 
     */
    function shiftBoth(thing, dx, dy) {
        if(!thing.noshiftx) {
            if(thing.parallax) {
                this.shiftHoriz(thing, thing.parallax * dx);
            } else {
                this.shiftHoriz(thing, dx);
            }
        }
        if(!thing.noshifty) {
            this.shiftVert(thing, dy);
        }
    }
    
    /**
     * 
     */
    function shiftThings(things, dx, dy) {
        for(var i = things.length - 1; i >= 0; i -= 1) {
            this.shiftBoth(things[i], dx, dy);
        }
    }
    
    /**
     * 
     */
    function shiftAll(dx, dy) {
        this.GroupHolder.callAll(this, shiftThings, dx, dy);
    }

    /**
     * 
     */
    function setWidth(thing, width, update_sprite, update_size) {        thing.width = width;
        thing.unitwidth = width * this.unitsize;
        
        if(update_sprite) {
            thing.spritewidth = width;
            thing.spritewidthpixels = width * this.unitsize;
        }
        
        if(update_size) {
            this.updateSize(thing);
            // PixelDrawer.setThingSprite(thing);
            console.log("Should update thing canvas on setWidth", thing.title);
        }
    }
    
    /**
     * 
     */
    function setHeight(thing, height, update_sprite, update_size) {
        thing.height = height;
        thing.unitheight = height * this.unitsize;
        
        if(update_sprite) {
            thing.spriteheight = height;
            thing.spriteheightpixels = height * this.unitsize;
        }
        
        if(update_size) {
            this.updateSize(thing);
            // setThingSprite(thing);
            console.log("Should update thing canvas on setHeight", thing.title);
        }
    }
    
    /**
     * 
     */
    function setSize(thing, width, height, update_sprite, update_size) {
        this.setWidth(thing, width, update_sprite, update_size);
        this.setHeight(thing, height, update_sprite, update_size);
    }
    
    /**
     * 
     */
    function updatePosition(thing, hard) {
        if(!thing.nomove || hard) {
            this.shiftHoriz(thing, thing.xvel);
        }
        
        if(!thing.nofall || hard) {
            this.shiftVert(thing, thing.yvel);
        }
    }
    
    /**
     * 
     */
    function updateSize(thing) {
        thing.unitwidth = thing.width * this.unitsize;
        thing.unitheight = thing.height * this.unitsize;
        thing.spritewidthpixels = thing.spritewidth * this.unitsize;
        thing.spriteheightpixels = thing.spriteheight * this.unitsize;
        
        if(thing.canvas !== undefined) {
            thing.canvas.width = thing.spritewidthpixels;
            thing.canvas.height = thing.spriteheightpixels;
            this.PixelDrawer.setThingSprite(thing);
        }
    }
    
    /**
     * 
     */
    function reduceHeight(thing, dy, see) {
        thing.top += dy;
        thing.height -= dy / this.unitsize;
        
        if(see) {
            this.updateSize(thing);
        }
    }
    
    /**
     * 
     */
    function increaseHeight(thing, dy) {
        thing.top -= dy;
        thing.height += dy / this.unitsize;
        thing.unitheight = thing.height * this.unitsize;
    }
    
    /**
     * 
     */
    function thingStoreVelocity(thing, keep_movement) {
        thing.xvel_old = thing.xvel || 0;
        thing.yvel_old = thing.yvel || 0;
        
        thing.nofall_old = thing.nofall || false;
        thing.nocollide_old = thing.nocollide || false;
        thing.movement_old = thing.movement || thing.movement_old;
        
        thing.nofall = thing.nocollide = true;
        thing.xvel = thing.yvel = false;
        
        if(!keep_movement) {
            thing.movement = false;
        }
    }
    
    /**
     * 
     */
    function thingRetrieveVelocity(thing, no_velocity) {
        if(!no_velocity) {
            thing.xvel = thing.xvel_old || 0;
            thing.yvel = thing.yvel_old || 0;
        }
        
        thing.movement = thing.movement_old || thing.movement;
        thing.nofall = thing.nofall_old || false;
        thing.nocollide = thing.nocollide_old || false;
    }
    
    
    /* Collision reactions
    */
    
    /**
     * 
     */
    function gainLife(amount, nosound) {
        amount = Number(amount) || 1;
        
        this.StatsHolder.increase("lives", amount);
        
        if(!nosound) {
            this.AudioPlayer.play("Gain Life");
        }
    }
    
    /**
     * Basic function for Mario causing an item to jump slightly into the air, 
     * such as from hitting a solid below it. 
     * 
     * @param {Thing} thing
     * @remarks This simply moves the thing up slightly and decreases its
     *          y-velocity, without considering x-direction.
     */
    function itemJump(thing) {
        thing.yvel -= FullScreenMario.unitsize * 1.4;
        this.shiftVert(thing, -FullScreenMario.unitsize);
    }
    
    /**
     * 
     */
    function jumpEnemy(thing, other) {
        if(thing.keys.up) {
            thing.yvel = thing.EightBitter.unitsize * -1.4;
        } else {
            thing.yvel = thing.EightBitter.unitsize * -.7;
        }
        
        thing.xvel *= .91;
        thing.EightBitter.AudioPlayer.play("Kick");
        
        if(other.group !== "item" || other.shell) {
            thing.jumpcount += 1;
            thing.EightBitter.scoreOn(
                thing.EightBitter.findScore(thing.jumpcount + thing.jumpers),
                other
            );
        }
        
        thing.jumpers += 1;
        thing.EightBitter.TimeHandler.addEvent(function (thing) {
            thing.jumpers -= 1;
        }, 1, thing);
    }
    
    /**
     * 
     */
    function playerShroom(thing) {
        if(thing.shrooming) {
            return;
        }
        
        thing.EightBitter.AudioPlayer.play("Powerup");
        thing.EightBitter.StatsHolder.increase("power");
        
        thing.EightBitter.scoreOn(1000, player);
        
        if(thing.power < 3) {
            thing.shrooming = true;
            thing.power += 1;
            
            if(thing.power === 3) {
                thing.EightBitter.playerGetsFire(player);
            } else {
                thing.EightBitter.playerGetsBig(player);
            }
        }
    }
    
    /**
     * 
     */
    function playerGetsBig(thing, no_animation) {
        thing.keys.down = 0;
        thing.EightBitter.setPlayerSizeLarge(thing);
        thing.EightBitter.removeClasses(thing, "crouching small");
        thing.EightBitter.updateBottom(thing, 0);
        thing.EightBitter.updateSize(thing);
        
        if(no_animation) {
            thing.EightBitter.addClass(thing, "large");
        } else {
            thing.EightBitter.playerGetsBigAnimation(thing);
        }
    }
    
    /**
     * 
     */
    function playerGetsBigAnimation(thing) {
        var stages = [
                'shrooming1', 'shrooming2', 'shrooming1', 'shrooming2',
                'shrooming3', 'shrooming2', 'shrooming3'
            ],
            i;
        
        thing.EightBitter.addClass(thing, "shrooming");
        thing.EightBitter.thingStoreVelocity(thing);
        
        // The last stage in the events clears it, resets movement, and stops
        stages.push(function (thing, stages) {
            thing.shrooming = stages.length = 0;
            
            thing.EightBitter.addClass(thing, "large");
            thing.EightBitter.removeClasses(thing, "shrooming shrooming3");
            thing.EightBitter.thingRetrieveVelocity(thing);
            
            return true;
        });
        
        thing.EightBitter.TimeHandler.addSpriteCycle(thing, stages, "shrooming", 6);
    }
    
    /**
     * 
     */
    function playerGetsSmall(thing) {
        console.warn("playerGetsSmall uses some global and global-style stuff.");
        console.warn("\tthingStoreVelocity, thingRetrieveVelocity, flicker");
        
        var bottom = thing.bottom;
        thing.keys.down = 0;
        thing.EightBitter.thingStoreVelocity(thing);
        
        // Step one
        thing.nocollidechar = true;
        flicker(thing);
        thing.EightBitter.removeClasses(thing, "running skidding jumping fiery");
        thing.EightBitter.addClasses(thing, "paddling small");
        
        // Step two (t+21)
        thing.EightBitter.TimeHandler.addEvent(function (thing) {
            thing.EightBitter.removeClass(thing, "large");
            thing.EightBitter.setPlayerSizeSmall(thing);
            thing.EightBitter.setBottom(thing, bottom - FullScreenMario.unitsize);
        }, 21, thing);
        
        // Step three (t+42)
        thing.EightBitter.TimeHandler.addEvent(function (thing) {
            thing.EightBitter.thingRetrieveVelocity(thing, false);
            thing.EightBitter.removeClass(thing, "paddling");
            if(thing.running || thing.xvel) {
                thing.EightBitter.addClass(thing, "running");
            }
            thing.EightBitter.PixelDrawer.setThingSprite(thing);
        }, 42, thing);
        
        // Step four (t+70)
        thing.EightBitter.TimeHandler.addEvent(function (thing) {
            thing.nocollidechar = false;
        }, 70, thing);
    }
    
    /**
     * 
     */
    function playerGetsFire(thing) {
        thing.shrooming = false;
        thing.EightBitter.removeClass(thing, "intofiery");
        thing.EightBitter.addClass(thing, "fiery");
    }
    
    /**
     * 
     */
    function setPlayerSizeSmall(thing) {
        thing.EightBitter.setSize(thing, 8, 8, true);
        thing.EightBitter.updateSize(thing);
    }
    
    /**
     * 
     */
    function setPlayerSizeLarge(thing) {
        thing.EightBitter.setSize(thing, 8, 16, true);
        thing.EightBitter.updateSize(thing);
    }
    
    /**
     * 
     */
    function removeCrouch() {
        console.warn("removeCrouch still uses global player");
        player.crouching = false;
        player.toly = player.toly_old || 0;
        if(player.power !== 1) {
            player.EightBitter.removeClass(player, "crouching");
            player.heigt = 16;
            player.EightBitter.updateBottom(player, 0);
            player.EightBitter.updateSize(player);
        }
    }
    
    
    /* Collision functions
    */
    
    /**
     * 
     */
    function collideFriendly(thing, other) {
        if(thing.player) {
            if(other.action) {
                other.action(thing, other);
            }
            other.death(other);
        }
    }
    
    /**
     * 
     */
    function collideCoin(thing, other) {
        if(!thing.player) {
            return;
        }
        
        thing.EightBitter.AudioPlayer.play("Coin");
        thing.EightBitter.StatsHolder.increase("score", 200);
        thing.EightBitter.StatsHolder.increase("coins", 1);
        thing.EightBitter.killNormal(other);
    }
    
    /** to do: scoring..
     * 
     */
    function collideFireball(thing, fireball) {
        alert("scoreEnemyFire is no good!");
        // if(!thing.alive || thing.height <= FullScreenMario.unitsize) {
            // return;
        // }
        
        // if(!thing.nofire) {
            // if(thing.solid) {
                // thing.EightBitter.AudioPlayer.playLocal("Bump", thing.right);
            // } else {
                // thing.EightBitter.AudioPlayer.playLocal("Kick", thing.right);
                // thing.death(thing, 2);
                // // scoreEnemyFire(thing);
            // }
        // }
        
        // fireball.death(fireball);
    }
    
    /**
     * 
     */
    function collideShell(thing, other) {
        // If only one is a shell, it should be other, not thing
        if(thing.shell) {
            if(other.shell) {
                return thing.EightBitter.collideShellShell(thing, other);
            }
            return thing.EightBitter.collideShell(thing, other);
        }
        
        // Hitting a solid (e.g. wall) 
        if(thing.grouping === "solid") {
            return thing.EightBitter.collideShellSolid(thing, other);
        }
        
        // Hitting the player
        if(thing.player) {
            return thing.EightBitter.collideShellPlayer(thing, other);
        }
        
        // Assume anything else to be an enemy, which only moving shells kill
        if(other.xvel) {
            if(thing.shellspawn) {
                thing = thing.EightBitter.killSpawn(thing);
            }
            thing.EightBitter.killFlip(thing);
            
            thing.EightBitter.AudioPlayer.play("Kick");
            thing.EightBitter.scoreOn(thing.EightBitter.findScore(other.enemyhitcount), thing);
            other.enemyhitcount += 1;
        } else {
            thing.moveleft = thing.EightBitter.objectToLeft(thing, other);
        }
    }
    
    /**
     * 
     */
    function collideShellSolid(thing, other) {
        if(other.right < thing.right) {
            thing.EightBitter.AudioPlayer.playLocal("Bump", thing.left);
            thing.EightBitter.setRight(other, thing.left);
            other.xvel = -other.speed;
            other.moveleft = true;
        } else {
            thing.EightBitter.AudioPlayer.playLocal("Bump", thing.right);
            thing.EightBitter.setLeft(other, thing.right);
            other.xvel = other.speed;
            other.moveleft = false;
        }
    }
    
    /**
     * 
     */
    function collideShellPlayer(thing, other) {
        console.warn("collideShellPlayer uses some global-style functions.");
        var shelltoleft = thing.EightBitter.objectToLeft(other, thing),
            playerjump = thing.yvel > 0 && (
                thing.bottom <= other.top + thing.EightBitter.unitsize * 2
            );
        
        // Star players kill the shell no matter what
        if(thing.star) {
            scorePlayerShell(thing, other);
            other.death(other, 2);
            return;
        }
        
        // If the shell is already being landed on by the player, see if it's
        // still being pushed to the side, or has reversed direction (is deadly)
        if(other.landing) {
            // Equal shelltoleft measurements: it's still being pushed
            if(other.shelltoleft === shelltoleft) {
                // Tepmorarily increase the landing count of the shell; if it is 
                // just being started, that counts as the score hit
                other.landing += 1;
                if(other.landing === 1) {
                    scorePlayerShell(thing, other);
                }
                thing.EightBitter.TimeHandler.addEvent(function (other) {
                    other.landing -= 1;
                }, 2, other);
            }
            // Different shelltoleft measurements: it's deadly
            else {
                thing.death(thing);
            }
            return;
        }
        
        // If the shell is being kicked by the player, either by hitting a still
        // shell or jumping onto an already moving one
        if(other.xvel === 0 || playerjump) {
            // scorePlayerShell(thing, other);
            
            // Reset any signs of peeking from the shell
            other.counting = 0;
            if(other.peeking) {
                other.peeking = false;
                thing.EightBitter.removeClass(other, "peeking");
                other.height -= thing.EightBitter.unitsize / 8;
                thing.EightBitter.updateSize(other);
            }
            
            // If the shell is standing still, make it move
            if(other.xvel === 0) {
                if(shelltoleft) {
                    other.moveleft = true;
                    other.xvel = -other.speed;
                } else {
                    other.moveleft = false;
                    other.xvel = other.speed;
                }
                other.hitcount += 1;
                thing.EightBitter.TimeHandler.addEvent(function (other) {
                    other.hitcount -= 1;
                }, 2, other);
            }
            // Otherwise it was moving, but should now be still
            else {
                other.xvel = 0;
            }
            
            // If the player is landing on the shell (with movements and xvels
            // already set), the player should then jump up a bit
            if(playerjump) {
                thing.EightBitter.AudioPlayer.play("Kick");
                
                if(!other.xvel) {
                    thing.EightBitter.jumpEnemy(thing, other);
                    thing.yvel *= 2;
                    // scorePlayerShell(thing, other);
                    thing.EightBitter.setBottom(thing, other.top - thing.EightBitter.unitsize, true);
                } else {
                    // scorePlayerShell(thing, other);
                }
                
                other.landing += 1;
                other.shelltoleft = shelltoleft;
                thing.EightBitter.TimeHandler.addEvent(function (other) {
                    other.landing -= 1;
                }, 2, other);
            }
        } 
        // Since the player is touching the shell normally, that's a death if
        // the shell isn't moving away
        else {
            if(!other.hitcount && (
                (shelltoleft && other.xvel > 0) 
                || (!shelltoleft && other.xvel < 0)
            )) {
                thing.death(thing);
            }
        }
    }
    
    /**
     * 
     */
    function collideShellShell(thing, other) {
        if(thing.xvel !== 0) {
            if(other.xvel !== 0) {
                var temp = thing.xvel;
                thing.xvel = other.xvel;
                other.xvel = temp;
                
                thing.EightBitter.shiftHoriz(thing, thing.xvel);
                thing.EightBitter.shiftHoriz(other, other.xvel);
            } else {
                thing.EightBitter.StatsHolder.increase("score", 500);
                other.death(other);
            }
        } else {
            thing.EightBitter.StatsHolder.increase("score", 500);
            thing.death(thing);
        }
    }
    
    /**
     * 
     */
    function collideEnemy(thing, other) {
        // If either is a player, make it thing (not other)
        if(!thing.player && other.player) {
            return thing.EightBitter.collideEnemy(thing, other);
        }
        
        // Death: nothing happens
        if(!thing.EightBitter.characterIsAlive(thing)
            || !thing.EightBitter.characterIsAlive(other)) {
            return;
        }
        
        // Items
        if(thing.group === "item") {
            if(thing.collide_primary) {
                return thing.collide(other, thing);
            }
            return;
        }
        
        if(!window.collideEnemyWarned) {
            window.collideEnemyWarned = true;
            console.warn("collideEnemy uses map_settings, scoreEnemyStar, etc.");
        }
        // Player interacting with enemies
        if(thing.player) {
            // Player landing on top of an enemy
            if(!map_settings.underwater 
                && ((thing.star && !other.nostar)
                    || (!other.deadly && objectOnTop(thing, other)))) {
                
                // Enforces toly (not touching means stop)
                if(thing.EightBitter.characterAboveEnemy(thing, other)) {
                    return;
                }
                
                // A star player just kills the enemy, no matter what
                if(thing.star) {
                    other.nocollide = true;
                    other.death(other, 2);
                    scoreEnemyStar(other);
                }
                // A non-star player kills the enemy with spawn, and hops
                else {
                    thing.EightBitter.setBottom(thing, 
                                Math.min(thing.bottom, 
                                        other.top + thing.EightBitter.unitsize));
                    thing.EightBitter.TimeHandler.addEvent(jumpEnemy, 0, thing, other);
                    
                    other.death(other, thing.star ? 2 : 0);
                    other.death(other);
                    scoreEnemyStomp(other);
                    
                    thing.EightBitter.addClass(thing, "hopping");
                    thing.EightBitter.removeClasses(thing, "running skidding jumping one two three");
                    thing.hopping = true;
                    
                    thing.EightBitter.setPlayerSizeSmall(thing); 
                }
            }
            // Player being landed on by an enemy
            else if(!thing.EightBitter.characterAboveEnemy(thing, other)) {
                thing.death(thing);
            }
        }
        // For non-players, it's just to characters colliding: they bounce
        else {
            thing.moveleft = thing.EightBitter.objectToLeft(thing, other);
            other.moveleft = !thing.moveleft;
        }
        
    }
    
    /* Movement functions
    */
    
    /**
     * Base, generic movement function for simple characters. The Thing moves
     * at a constant rate in either the x or y direction, and switches direction
     * only if directed by the engine (e.g. when it hits a Solid)
     * 
     * @param {Thing} thing
     * @remarks thing.speed is the only required member attribute; .direction
     *          and .moveleft should be set by the game engine.
     *          * thing.direction - what direction it should be moving
     *          * thing.moveleft - what direction is actually is moving
     *          * thing.speed - the Thing's typical speed
     */
    function moveSimple(thing) {
        // If the thing is looking away from the intended direction, flip it
        if(thing.direction != thing.moveleft) {
            // thing.moveleft is truthy: it should now be looking to the right
            if(thing.moveleft) {
                thing.xvel = -thing.speed;
                if(!thing.noflip) {
                    unflipHoriz(thing);
                }
            }
            // thing.moveleft is falsy: it should now be looking to the left
            else {
                thing.xvel = thing.speed;
                if(!thing.noflip) {
                    flipHoriz(thing);
                }
            }
            thing.direction = thing.moveleft;
        }
    }
    
    /**
     * Extension of the moveSimple movement function for Things that shouldn't
     * fall off the edge of their resting blocks
     * @param {Thing} thing
     */
    function moveSmart(thing) {
        // Start off by calling moveSimple for normal movement
        moveSimple(thing);
        
        // If this isn't resting, it's the same as moveSimple
        if(!thing.resting) {
            return;
        }
        
        // Check for being over the edge in the direction of movement
        if(thing.moveleft) {
            if(thing.left + this.unitsize <= thing.resting.left) {
                shiftHoriz(thing, this.unitsize);
                thing.moveleft = false;
            }
        } else {
            if(thing.right - this.unitsize >= thing.resting.right) {
                shiftHoriz(thing, -this.unitsize);
                thing.moveleft = true;
            }
        }
    }
    
    /**
     * Extension of the moveSimple movement function for Things that should
     * jump whenever they hit a resting block.
     * @param {Thing} thing
     * @remarks thing.jumpheight is required to know how high to jump
     */
    function moveJumping(thing) {
        // Start off by calling moveSimple for normal movement
        moveSimple(thing);
        
        // If .resting, jump!
        if(thing.resting) {
            thing.yvel = -Math.abs(thing.jumpheight);
            thing.resting = false;
        }
    }
    
    /**
     * Initial movement function for Things that float up and down (vertically).
     * This uses map_settings - in the future, it should just be relative
     * to the starting yloc of the Thing
     * 
     * @param {Thing} thing
     * @remarks thing.begin and thing.end are used as the vertical endpoints;
     *          .begin is the bottom and .end is the top (since begin <= end)
     */
    function moveFloating(thing) {
        // Make sure thing.begin <= thing.end
        setPlatformEndpoints(thing);
        
        // Make thing.begin and thing.end relative to map_settings.floor
        console.warn("moveFloating should avoid using map_settings");
        thing.begin = map_settings.floor * this.unitsize - thing.begin;
        thing.end = map_settings.floor * this.unitsize - thing.end;
        
        // Use moveFloatingReal as the actual movement function from now on
        (thing.movement = moveFloatingReal)(thing);
    }
    
    /**
     * Actual movement function for Things that float up and down (vertically).
     * If the Thing has reached thing.begin or thing.end, it gradually switches
     * thing.yvel
     * 
     * @param {Thing} thing
     * @remarks thing.maxvel is used as the maximum absolute speed vertically
     */
    function moveFloatingReal(thing) {
        // If above the endpoint:
        if(thing.top <= thing.end) {
            thing.yvel = Math.min(thing.yvel + this.unitsize / 32, thing.maxvel);
        }
        // If below the endpoint:
        else if(thing.bottom >= thing.begin) {
            thing.yvel = Math.max(thing.yvel - this.unitsize / 32, -thing.maxvel);
        }
        
        // Deal with velocities and whether the player is resting on this
        movePlatform(thing);
    }
    
    /**
     * Initial movement function for Things that float sideways (horizontally).
     * 
     * @param {Thing} thing
     * @remarks thing.begin and thing.end are used as the horizontal endpoints;
     *          .begin is the left and .end is the right (since begin <= end)
     */
    function moveSliding(thing) {
        // Make sure thing.begin <= thing.end
        setPlatformEndpoints(thing);
        
        // Use moveSlidingReal as the actual movement function from now on
        (thing.movement = moveSlidingReal)(thing);
    }
    
    /**
     * Actual movement function for Things that float sideways (horizontally).
     * If the Thing has reached thing.begin or thing.end, it gradually switches
     * thing.xvel
     * 
     * @param {Thing} thing
     * @remarks thing.maxvel is used as the maximum absolute speed horizontally
     */
    function moveSlidingReal(thing) {
        // If to the left of the endpoint:
        if(FSM.MapScreener.left + thing.left <= thing.begin) {
            thing.xvel = Math.min(thing.xvel + this.unitsize / 32, thing.maxvel);
        }
        // If to the right of the endpoint:
        else if(FSM.MapScreener.left + thing.right > thing.end) {
            thing.xvel = Math.max(thing.xvel - this.unitsize / 32, -thing.maxvel);
        }
        
        // Deal with velocities and whether the player is resting on this
        movePlatform(thing);
    }
    
    /**
     * Ensures thing.begin <= thing.end (so there won't be glitches pertaining
     * to them in functions like moveFloating and moveSliding
     * 
     * @param {Thing} thing
     */
    function setPlatformEndpoints(thing) {
        if(thing.begin > thing.end) {
            var temp = thing.begin;
            thing.begin = thing.end;
            thing.end = temp;
        }
    }
    
    /**
     * Moves a platform by its velocities, and checks for whether the player
     * is resting on it (if so, the player must be moved accordingly)
     * 
     * @param {Thing} thing
     */
    function movePlatform(thing) {
        shiftHoriz(thing, thing.xvel);
        this.shiftVert(thing, thing.yvel);
        
        // If the player is resting on this and this is alive, move the player
        if(thing === player.resting && player.alive) {
            setBottom(player, thing.top);
            shiftHoriz(player, thing.xvel);
            
            // If the player is too far to the right or left, stop that overlap
            if(player.right > this.MapScreener.innerWidth) {
                setRight(player, this.MapScreener.innerWidth);
            } else if(player.left < 0) {
                setLeft(player, 0);
            }
        }
    }        /**     *      */    function moveFalling(thing) {        // If the player isn't resting on this thing (any more?), ignore it        if(thing !== player.resting) {            // Since the player might have been on this thing but isn't anymore,             // set the yvel to 0 just in case            thing.yvel = 0;            return;        }                // Since the player is on this thing, start falling more        this.shiftVert(thing, thing.yvel += this.unitsize / 8);        EightBittr.prototype.physics.setBottom(player, thing.top);                // After a velocity threshold, start always falling        if(thing.yvel >= thing.fall_threshold_start || this.unitsize * 2.8) {            thing.freefall = true;            thing.movement = moveFreeFalling;        }    }        /**     *      */    function moveFreeFalling(thing) {        // Accelerate downwards, increasing the thing's y-velocity        thing.yvel += thing.acceleration || this.unitsize / 16;        this.shiftVert(thing, thing.yvel);                // After a velocity threshold, stop accelerating        if(thing.yvel >= thing.fall_threshold_end || this.unitsize * 2) {            thing.movement = movePlatform;        }    }
    
    /**
     * 
     */
    function moveShell(thing) {
        if(thing.xvel !== 0) {
            return;
        }
        thing.counting += 1;
        
        if(thing.counting === 350) {
            thing.peeking = true;
            thing.height += thing.EightBitter.unitsize / 8;
            thing.EightBitter.addClass(thing, "peeking");
            thing.EightBitter.updateSize(thing);
        } else if(thing.counting === 490) {
            thing.spawnsettings = {
                "smart": thing.smart
            };
            thing.EightBitter.killSpawn(thing);
        }
    }
    
    
    /* Appearance utilities
    */
    
    /**
     * 
     */
    function setTitle(thing, string) {
        thing.title = string;
        thing.EightBitter.PixelDrawer.setThingSprite(thing);
    }
    
    /**
     * 
     */
    function setClass(thing, string) {
        thing.className = string;
        thing.EightBitter.PixelDrawer.setThingSprite(thing);
    }
    
    /**
     * 
     */
    function setClassInitial(thing, string) {
        thing.className = string;
    }
    
    /**
     * 
     */
    function addClass(thing, string) {
        thing.className += " " + string;
        thing.EightBitter.PixelDrawer.setThingSprite(thing);
    }
    
    /**
     * 
     */
    function addClasses(thing) {
        var strings, arr, i, j;
        for(i = 1; i < arguments.length; i += 1) {
            arr = arguments[i];
            
            if(!(arr instanceof Array)) {
                arr = arr.split(' ');
            }
            
            for(j = arr.length - 1; j >= 0; j -= 1) {
                addClass(thing, arr[j]);
            }
        }
    }
    
    /**
     * 
     */
    function removeClass(thing, string) {
        if(!string) {
            return;
        }
        if(string.indexOf(' ') !== -1) {
            removeClasses(thing, string);
        }
        thing.className = thing.className.replace(new RegExp(" " + string, "gm"), "");
        thing.EightBitter.PixelDrawer.setThingSprite(thing);
    }
    
    /**
     * 
     */
    function removeClasses(thing) {
        // var strings, arr, i, j;
        // for(i = 1; i < arguments.length; i += 1) {
            // arr = arguments[i];
            
            // if(!(arr instanceof Array)) {
                // arr = arr.split(' ');
            // }
            
            // for(j = arr.length - 1; j >= 0; j -= 1) {
                // removeClass(thing, arr[j]);
            // }
        // }
        
      var strings, arr, i, j;
      for(i = 1; i < arguments.length; ++i) {
        arr = arguments[i];
        if(!(arr instanceof Array)) arr = arr.split(" ");
        for(j = arr.length - 1; j >= 0; --j)
          removeClass(thing, arr[j]);
      }
    }
    
    /**
     * 
     */
    function switchClass(thing, string_out, string_in) {
        removeClass(thing, string_out);
        addClass(thing, string_in);
    }
    
    /**
     * 
     */
    function flipHoriz(thing) {
        addClass(thing, "flipped");
    }
    
    /**
     * 
     */
    function flipVert(thing) {
        addClass(thing, "flip-vert");
    }
    
    /**
     * 
     */
    function unflipHoriz(thing) {
        removeClass(thing, "flipped");
    }
    
    /**
     * 
     */
    function unflipVert(thing) {
        removeClass(thing, "flip-vert");
    }
    
    
    /* Death functions
    */
    
    /**
     * 
     */
    function killNormal(thing) {
        if(!thing) {
            return;
        }
        
        thing.hidden = thing.dead = true;
        thing.alive = thing.resting = thing.movement = false;
        
        if(thing.EightBitter) {
            thing.EightBitter.TimeHandler.clearAllCycles(thing);
        }
    }
    
    /**
     * 
     */
    function killFlip(thing, extra) {
        thing.EightBitter.flipVert(thing);
        
        if(!extra) {
            extra = 0;
        }
        
        if(thing.bottomBump) {
            thing.bottomBump = undefined;
        }
        
        thing.nocollide = thing.dead = true;
        thing.resting = thing.movement = thing.speed = thing.xvel = thing.nofall = false;
        thing.yvel -= unitsize;
        thing.EightBitter.TimeHandler.addEvent(killNormal, 70 + extra, thing);
    }
    
    /**
     * 
     */
    function killSpawn(thing, big) {
        if(big) {
            killNormal(thing);
            return;
        }
        
        if(thing.spawntype) {
            var spawn = thing.EightBitter.ObjectMaker.make(
                thing.spawntype, thing.spawnsettings || {}
            );
            thing.EightBitter.addThing(spawn);
            thing.EightBitter.setBottom(spawn, thing.bottom);
            thing.EightBitter.setMidXObj(spawn, thing);
        } else {
            console.warn("Thing " + thing.title + " has no .spawntype.");
        }
        
        thing.EightBitter.killNormal(thing);
        
        return spawn;
    }
    
    /**
     * 
     */
    function killGoomba(thing, big) {
        if(big) {
            thing.EightBitter.killFlip(thing);
            return;
        }
        
        thing.EightBitter.killSpawn(thing);
    }
    
    /**
     * 
     */
    function killToShell(thing, big) {
        var spawn;
        
        thing.spawnsettings = {
            "smart": thing.smart
        };
            
        if(thing.winged || (big && big !== 2)) {
            thing.spawntype = thing.title;
        } else {
            thing.spawntype = thing.shelltype || "Shell";
        }
        spawn = thing.EightBitter.killSpawn(thing);
        
        thing.EightBitter.killNormal(thing);
        
        if(big === 2) {
            thing.EightBitter.killFlip(spawn);
        }
    }
    
    /**
     * Wipes the screen of any characters or solids that should be gone during
     * an important cutscene, such as hitting an end-of-level flag.
     * For characters, they're deleted if .nokillonend isn't truthy. If they
     * have a .killonend function, that's called on them.
     * Solids are only deleted if their .killonend is true.
     * 
     * @todo   Rename .killonend to be more accurate
     * @remarks If thing.killonend is a function, it is called on the thing.
     */
    function killNPCs() {
        var holder = this.ThingHitter.getGroupHolder(),
            group, thing, i;
        
        // Characters: they must opt out of being killed with .nokillonend, and
        // may opt into having a function called instead (such as Lakitus).
        group = holder.getCharacterGroup();
        for(i = group.length - 1; i >= 0; --i) {
            thing = group[i];
            
            if(!thing.nokillend) {
                this.deleteThing(thing, group, i);
            } else if(thing.killonend) {
                thing.killonend(thing);
            }
        }
        
        // Solids: they may opt into being deleted
        group = holder.getSolidGroup();
        for(i = group.length - 1; i >= 0; --i) {
            thing = group[i];
            
            if(thing.killonend) {
                this.deleteThing(thing, group, i);
            }
        }
    }
    
    
    /* Scoring
    */
    
    /**
     * 
     */
    function findScore(level) {
        if(level < this.point_levels.length) {
            return this.point_levels[level];
        } else {
            this.gainLife(1);
        }
    }
    
    /**
     * Driver function to score some number of points for the player and show
     * the gains via an animation.
     * 
     * @param {Number} value   How many points the player is receiving.
     * @param {Boolean} continuation   Whether the game shouldn't increase the 
     *                                 score amount in the StatsHoldr (this will
     *                                 only be false on the first score() call).
     * @remarks   For point gains that should not have a visual animation, 
     *            directly call StatsHolder.increase("score", value).
     * @remarks   The calling chain will be: 
     *                score -> scoreOn -> scoreAnimateOn -> scoreAnimate          
     */
    function score(value, continuation) {
        console.warn("Score still using global player");
        if(!value) {
            return;
        }
        scoreOn(value, player, true);
        
        if(!continuation) {
            this.StatsHolder.increase("score", value);
        }
    }
    
    /**
     * Scores a given number of points for the player, and shows the gains via
     * an animation centered at the top of a thing.
     * 
     * @param {Number} value   How many points the player is receiving.
     * @param {Thing} thing   An in-game Thing to place the visual score text
     *                        on top of and centered.
     * @param {Boolean} continuation   Whether the game shouldn't increase the 
     *                                 score amount in the StatsHoldr (this will
     *                                 only be false on the first score() call).
     * @remarks   The calling chain will be: 
     *                scoreOn -> scoreAnimateOn -> scoreAnimate     
     */
    function scoreOn(value, thing, continuation) {
        if(!value) {
            return;
        }
        var text = thing.EightBitter.ObjectMaker.make("Text" + value, {
            "value": value
        });
        thing.EightBitter.addThing(text);
        
        thing.EightBitter.scoreAnimateOn(text, thing);
        
        if(!continuation) {
            this.StatsHolder.increase("score", value);
        }
    }
    
    /**
     * Centers a text associated with some points gain on the top of a Thing,
     * and animates it updward, setting an event for it to die.
     * 
     * @param {Number} value   How many points the player is receiving.
     * @param {Thing} thing   An in-game Thing to place the visual score text
     *                        on top of and centered.
     * @param {Boolean} continuation   Whether the game shouldn't increase the 
     *                                 score amount in the StatsHoldr (this will
     *                                 only be false on the first score() call).
     * @remarks   The calling chain will be: 
     *                scoreAnimateOn -> scoreAnimate     
     */
    function scoreAnimateOn(text, thing) {
        thing.EightBitter.setMidXObj(text, thing);
        thing.EightBitter.setBottom(text, thing.top);
        thing.EightBitter.scoreAnimate(text);
    }
    
    /**
     * Animates a text associated with some points gain upward, and sets an 
     * event for it to die.
     * 
     * @param {Number} value   How many points the player is receiving.
     * @param {Number} [timeout]   How many game ticks to wait before killing
     *                             the text (defaults to 35).
     * @remarks   This is the last function in the score() calling chain:
     *                scoreAnimate <- scoreAnimateOn <- scoreOn <- score
     */
    function scoreAnimate(text, timeout) {
        timeout = timeout || 28;
        text.EightBitter.TimeHandler.addEventInterval(text.EightBitter.shiftVert, 1, timeout, text, -unitsize / 6);
        text.EightBitter.TimeHandler.addEvent(text.EightBitter.killNormal, timeout, text);
    }
    
    /**
     * 
     * 
     * @remarks See http://themushroomkingdom.net/smb_breakdown.shtml
     */
    function scorePlayerFlag(player, difference) {
        var amount;
        
        if(difference < 28) {
            amount = difference < 8 ? 100 : 400;
        } else if(difference < 40) {
            amount = 800;
        } else {
            amount = difference < 62 ? 2000 : 5000;
        }
        
        player.EightBitter.scoreOn(amount, player);
    }
    
    
    /* Miscellaneous
    */
    
    /**
     * 
     */
    function characterIsAlive(thing) {
        return thing && !thing.dead && thing.alive;
    }
    
    /* Map macros
    */
    
    /**
     * Sample macro with no functionality, except to console.log a listing of 
     * the arguments provided to each macro function.
     * For all real macros, arguments are listed as the keys given as members of
     * the reference object.
     * They also ignore the "x" and "y" arguments, which 
     * are the x-location and y-location of the output (and both default to 0),
     * and the "macro" argument, which is listed as their alias.
     * 
     * @alias Example
     * @param {Object} reference   A listing of the settings for this macro,
     *                             from an Area's .creation Array. This should 
     *                             be treated as static!
     * @param {Object[]} prethings   The Area's actual .creation Array, which
     *                               consists of a bunch of reference Objects.
     * @param {Area} area   The area currently being generated.
     * @param {Map} map   The map containing the area currently being generated.
     */
    function macroExample(reference, prethings, area, map) {
        console.log("This is a macro that may be called by a map creation.");
        console.log("The arguments are:\n");
        console.log("Reference (the listing from area.creation):  ", reference);
        console.log("Prethings (the area's listing of prethings): ", prethings);
        console.log("Area      (the currently generated area):    ", area);
        console.log("Map       (the map containing the area):     ", map);
    }
    
    /**
     * Macro to place a single type of Thing multiple times, drawing from a
     * bottom/left corner to a top/right corner.
     * 
     * @alias Fill
     * @param {String} thing   The name of the Thing to fill (e.g. "Brick").
     * @param {Number} xnum   How many times to repeat the Thing horizontally
     *                        to the right (defaults to 1)
     * @param {Number} ynum   How many times to repeat the Thing vertically
     *                        upwards (defaults to 1)
     * @param {Number} xwidth   How many units are between the left edges of 
     *                          placed Things horizontally (defaults to 0)
     * @param {Number} yheight   How many units are between the top edges of
     *                           placed Things vertically (defaults to 0)
     * @example   { "macro": "Fill", "thing": "Brick",
     *              "x": 644, "y": 64, "xnum": 5, "xwidth": 8 }
     */
    function macroFillPreThings(reference) {
        var xnum = reference.xnum || 1,
            ynum = reference.ynum || 1,
            xwidth = reference.xwidth || 0,
            yheight = reference.yheight || 0,
            x = reference.x || 0,
            yref = reference.y || 0,
            ynum = reference.ynum || 1,
            outputs = new Array(xnum * ynum),
            output,
            o = 0, y, i, j;
        
        for(i = 0; i < xnum; ++i) {
            y = yref;
            for(j = 0; j < ynum; ++j) {
                output = {
                    "x": x,
                    "y": y,
                    "macro": undefined
                };
                outputs[o] = proliferate(output, reference, true);
                o += 1;
                y += yheight;
            }
            x += xwidth;
        }
        return outputs;
    }
    
    /**
     * Macro to continuously place a listing of Things multiple times, from left
     * to right. This is commonly used for repeating background scenery.
     * 
     * @alias Pattern
     * @param {String} pattern   The name of the pattern to print, from the
     *                           listing in this.patterns.
     * @param {Number} repeat   How many times to repeat the overall pattern.
     */
    function macroFillPrePattern(reference) {
        // Make sure the pattern exists before doing anything
        if(!FullScreenMario.prototype.maps.patterns[reference.pattern]) {
            console.warn("An unknown pattern is referenced: " + reference);
            return;
        }
        var pattern = FullScreenMario.prototype.maps.patterns[reference.pattern],
            length = pattern.length,
            // Problem: see where defaults[...].height is referenced below
            defaults = FullScreenMario.prototype.things.properties,
            repeats = reference.repeat || 1,
            xpos = reference.x || 0,
            ypos = reference.y || 0,
            outputs = new Array(length * repeats),
            o = 0,
            output, prething, i, j;
        
        // For each time the pattern should be repeated:
        for(i = 0; i < repeats; i += 1) {
            // For each Thing listing in the pattern:
            for(j = 0; j < length; j += 1) {
                prething = pattern[j];
                output = {
                    "thing": prething[0],
                    "x": xpos + prething[1],
                    "y": ypos + prething[2]
                };
                // Problem: the .height will need to be calculated from up
                // the prototypal inheritance tree
                output.y += defaults[prething[0]].height;
            }
            xpos += pattern.width;
        }
        
        return outputs;
    }
      
    
    // Add all registered functions from above to the FullScreenMario prototype
    proliferateHard(FullScreenMario.prototype, {
        // Global manipulations
        "addThing": addThing,
        "scrollWindow": scrollWindow,
        // Collision detectors
        "thingCanCollide": thingCanCollide,
        "thingTouchesThing": thingTouchesThing,
        "thingOnTop": thingOnTop,
        "thingOnSolid": thingOnSolid,
        "characterTouchesSolid": characterTouchesSolid,
        "characterTouchesCharacter": characterTouchesCharacter,
        "characterHitsSolid": characterHitsSolid,
        "characterHitsCharacter": characterHitsCharacter,
        "characterOnSolid": characterOnSolid,
        "characterOnResting": characterOnResting,
        "characterAboveEnemy": characterAboveEnemy,  
        "solidOnCharacter": solidOnCharacter,
        // Collision reactions
        "gainLife": gainLife,
        "itemJump": itemJump,
        "jumpEnemy": jumpEnemy,
        "playerShroom": playerShroom,
        "playerGetsBig": playerGetsBig,
        "playerGetsBigAnimation": playerGetsBigAnimation,
        "playerGetsSmall": playerGetsSmall,
        "playerGetsFire": playerGetsFire,
        "setPlayerSizeSmall": setPlayerSizeSmall,
        "setPlayerSizeLarge": setPlayerSizeLarge,
        "removeCrouch": removeCrouch,
        // Collision functions
        "collideFriendly": collideFriendly,
        "collideCoin": collideCoin,
        "collideFireball": collideFireball,
        "collideShell": collideShell,
        "collideShellSolid": collideShellSolid,
        "collideShellPlayer": collideShellPlayer,
        "collideShellShell": collideShellShell,
        "collideEnemy": collideEnemy,
        // Movement
        "moveSimple": moveSimple,
        "moveSmart": moveSmart,
        "moveJumping": moveJumping,
        "moveFloating": moveFloating,
        "moveFloatingReal": moveFloatingReal,
        "moveSliding": moveSliding,
        "moveSlidingReal": moveSlidingReal,
        "movePlatform": movePlatform,        "moveFalling": moveFalling,        "moveFreeFalling": moveFreeFalling,
        "moveShell": moveShell,
        // Physics
        "shiftBoth": shiftBoth,
        "shiftThings": shiftThings,
        "shiftAll": shiftAll,
        "setWidth": setWidth,
        "setHeight": setHeight,
        "setSize": setSize,
        "updatePosition": updatePosition,
        "updateSize": updateSize,
        "reduceHeight": reduceHeight,
        "increaseHeight": increaseHeight,
        "thingStoreVelocity": thingStoreVelocity,
        "thingRetrieveVelocity": thingRetrieveVelocity,
        // Appearance utilities
        "setTitle": setTitle,
        "setClass": setClass,
        "setClassInitial": setClassInitial,
        "addClass": addClass,
        "addClasses": addClasses,
        "removeClass": removeClass,
        "removeClasses": removeClasses,
        "switchClass": switchClass,
        "flipHoriz": flipHoriz,
        "flipVert": flipVert,
        "unflipHoriz": unflipHoriz,
        "unflipVert": unflipVert,
        // Death functions
        "killNormal": killNormal,
        "killFlip": killFlip,
        "killSpawn": killSpawn,
        "killGoomba": killGoomba,
        "killToShell": killToShell,
        "killNPCs": killNPCs,
        // Scoring
        "findScore": findScore,
        "score": score,
        "scoreOn": scoreOn,
        "scoreAnimateOn": scoreAnimateOn,
        "scoreAnimate": scoreAnimate,
        "scorePlayerFlag": scorePlayerFlag,
        // Miscellaneous
        "characterIsAlive": characterIsAlive,
        // Map macros
        "macros": {
            "Example": macroExample,
            "Fill": macroFillPreThings,
            "Pattern": macroFillPrePattern
        }
    });
    
    return FullScreenMario;
})();