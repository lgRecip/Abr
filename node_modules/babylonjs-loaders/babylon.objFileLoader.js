(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babylonjs"));
	else if(typeof define === 'function' && define.amd)
		define("babylonjs-loaders", ["babylonjs"], factory);
	else if(typeof exports === 'object')
		exports["babylonjs-loaders"] = factory(require("babylonjs"));
	else
		root["LOADERS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/loaders/src/OBJ/index.ts":
/*!*********************************************!*\
  !*** ../../../dev/loaders/src/OBJ/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ _objFileLoader__WEBPACK_IMPORTED_MODULE_3__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser)
/* harmony export */ });
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _objLoadingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objLoadingOptions */ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");
/* harmony import */ var _objFileLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objFileLoader */ "../../../dev/loaders/src/OBJ/objFileLoader.ts");






/***/ }),

/***/ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/mtlFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* binding */ MTLFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/standardMaterial */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__);



/**
 * Class reading and parsing the MTL file bundled with the obj file.
 */
var MTLFileLoader = /** @class */ (function () {
    function MTLFileLoader() {
        /**
         * All material loaded from the mtl will be set here
         */
        this.materials = [];
    }
    /**
     * This function will read the mtl file and create each material described inside
     * This function could be improve by adding :
     * -some component missing (Ni, Tf...)
     * -including the specific options available
     *
     * @param scene defines the scene the material will be created in
     * @param data defines the mtl data to parse
     * @param rootUrl defines the rooturl to use in order to load relative dependencies
     * @param assetContainer defines the asset container to store the material in (can be null)
     */
    MTLFileLoader.prototype.parseMTL = function (scene, data, rootUrl, assetContainer) {
        if (data instanceof ArrayBuffer) {
            return;
        }
        //Split the lines from the file
        var lines = data.split("\n");
        // whitespace char ie: [ \t\r\n\f]
        var delimiter_pattern = /\s+/;
        //Array with RGB colors
        var color;
        //New material
        var material = null;
        //Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            // Blank line or comment
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
            }
            //Get the first parameter (keyword)
            var pos = line.indexOf(" ");
            var key = pos >= 0 ? line.substring(0, pos) : line;
            key = key.toLowerCase();
            //Get the data following the key
            var value = pos >= 0 ? line.substring(pos + 1).trim() : "";
            //This mtl keyword will create the new material
            if (key === "newmtl") {
                //Check if it is the first material.
                // Materials specifications are described after this keyword.
                if (material) {
                    //Add the previous material in the material array.
                    this.materials.push(material);
                }
                //Create a new material.
                // value is the name of the material read in the mtl file
                scene._blockEntityCollection = !!assetContainer;
                material = new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(value, scene);
                material._parentContainer = assetContainer;
                scene._blockEntityCollection = false;
            }
            else if (key === "kd" && material) {
                // Diffuse color (color under white light) using RGB values
                //value  = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.diffuseColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ka" && material) {
                // Ambient color (color under shadow) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set tghe color into the material
                material.ambientColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ks" && material) {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                //value = "r g b"
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                //color = [r,g,b]
                //Set the color into the material
                material.specularColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ke" && material) {
                // Emissive color using RGB values
                color = value.split(delimiter_pattern, 3).map(parseFloat);
                material.emissiveColor = babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Color3.FromArray(color);
            }
            else if (key === "ns" && material) {
                //value = "Integer"
                material.specularPower = parseFloat(value);
            }
            else if (key === "d" && material) {
                //d is dissolve for current material. It mean alpha for BABYLON
                material.alpha = parseFloat(value);
                //Texture
                //This part can be improved by adding the possible options of texture
            }
            else if (key === "map_ka" && material) {
                // ambient texture map with a loaded image
                //We must first get the folder of the image
                material.ambientTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_kd" && material) {
                // Diffuse texture map with a loaded image
                material.diffuseTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ks" && material) {
                // Specular texture map with a loaded image
                //We must first get the folder of the image
                material.specularTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
            }
            else if (key === "map_ns") {
                //Specular
                //Specular highlight component
                //We must first get the folder of the image
                //
                //Not supported by BABYLON
                //
                //    continue;
            }
            else if (key === "map_bump" && material) {
                //The bump texture
                var values = value.split(delimiter_pattern);
                var bumpMultiplierIndex = values.indexOf("-bm");
                var bumpMultiplier = null;
                if (bumpMultiplierIndex >= 0) {
                    bumpMultiplier = values[bumpMultiplierIndex + 1];
                    values.splice(bumpMultiplierIndex, 2); // remove
                }
                material.bumpTexture = MTLFileLoader._GetTexture(rootUrl, values.join(" "), scene);
                if (material.bumpTexture && bumpMultiplier !== null) {
                    material.bumpTexture.level = parseFloat(bumpMultiplier);
                }
            }
            else if (key === "map_d" && material) {
                // The dissolve of the material
                material.opacityTexture = MTLFileLoader._GetTexture(rootUrl, value, scene);
                //Options for illumination
            }
            else if (key === "illum") {
                //Illumination
                if (value === "0") {
                    //That mean Kd == Kd
                }
                else if (value === "1") {
                    //Color on and Ambient on
                }
                else if (value === "2") {
                    //Highlight on
                }
                else if (value === "3") {
                    //Reflection on and Ray trace on
                }
                else if (value === "4") {
                    //Transparency: Glass on, Reflection: Ray trace on
                }
                else if (value === "5") {
                    //Reflection: Fresnel on and Ray trace on
                }
                else if (value === "6") {
                    //Transparency: Refraction on, Reflection: Fresnel off and Ray trace on
                }
                else if (value === "7") {
                    //Transparency: Refraction on, Reflection: Fresnel on and Ray trace on
                }
                else if (value === "8") {
                    //Reflection on and Ray trace off
                }
                else if (value === "9") {
                    //Transparency: Glass on, Reflection: Ray trace off
                }
                else if (value === "10") {
                    //Casts shadows onto invisible surfaces
                }
            }
            else {
                // console.log("Unhandled expression at line : " + i +'\n' + "with value : " + line);
            }
        }
        //At the end of the file, add the last material
        if (material) {
            this.materials.push(material);
        }
    };
    /**
     * Gets the texture for the material.
     *
     * If the material is imported from input file,
     * We sanitize the url to ensure it takes the texture from aside the material.
     *
     * @param rootUrl The root url to load from
     * @param value The value stored in the mtl
     * @param scene
     * @returns The Texture
     */
    MTLFileLoader._GetTexture = function (rootUrl, value, scene) {
        if (!value) {
            return null;
        }
        var url = rootUrl;
        // Load from input file.
        if (rootUrl === "file:") {
            var lastDelimiter = value.lastIndexOf("\\");
            if (lastDelimiter === -1) {
                lastDelimiter = value.lastIndexOf("/");
            }
            if (lastDelimiter > -1) {
                url += value.substr(lastDelimiter + 1);
            }
            else {
                url += value;
            }
        }
        // Not from input file.
        else {
            url += value;
        }
        return new babylonjs_Maths_math_color__WEBPACK_IMPORTED_MODULE_0__.Texture(url, scene, false, MTLFileLoader.INVERT_TEXTURE_Y);
    };
    /**
     * Invert Y-Axis of referenced textures on load
     */
    MTLFileLoader.INVERT_TEXTURE_Y = true;
    return MTLFileLoader;
}());


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objFileLoader.ts":
/*!*****************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objFileLoader.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJFileLoader: () => (/* binding */ OBJFileLoader)
/* harmony export */ });
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/assetContainer */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mtlFileLoader */ "../../../dev/loaders/src/OBJ/mtlFileLoader.ts");
/* harmony import */ var _solidParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./solidParser */ "../../../dev/loaders/src/OBJ/solidParser.ts");






/**
 * OBJ file type loader.
 * This is a babylon scene loader plugin.
 */
var OBJFileLoader = /** @class */ (function () {
    /**
     * Creates loader for .OBJ files
     *
     * @param loadingOptions options for loading and parsing OBJ/MTL files.
     */
    function OBJFileLoader(loadingOptions) {
        /**
         * Defines the name of the plugin.
         */
        this.name = "obj";
        /**
         * Defines the extension the plugin is able to load.
         */
        this.extensions = ".obj";
        this._assetContainer = null;
        this._loadingOptions = loadingOptions || OBJFileLoader._DefaultLoadingOptions;
    }
    Object.defineProperty(OBJFileLoader, "INVERT_TEXTURE_Y", {
        /**
         * Invert Y-Axis of referenced textures on load
         */
        get: function () {
            return _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y;
        },
        set: function (value) {
            _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader.INVERT_TEXTURE_Y = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OBJFileLoader, "_DefaultLoadingOptions", {
        get: function () {
            return {
                computeNormals: OBJFileLoader.COMPUTE_NORMALS,
                optimizeNormals: OBJFileLoader.OPTIMIZE_NORMALS,
                importVertexColors: OBJFileLoader.IMPORT_VERTEX_COLORS,
                invertY: OBJFileLoader.INVERT_Y,
                invertTextureY: OBJFileLoader.INVERT_TEXTURE_Y,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                UVScaling: OBJFileLoader.UV_SCALING,
                materialLoadingFailsSilently: OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY,
                optimizeWithUV: OBJFileLoader.OPTIMIZE_WITH_UV,
                skipMaterials: OBJFileLoader.SKIP_MATERIALS,
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Calls synchronously the MTL file attached to this obj.
     * Load function or importMesh function don't enable to load 2 files in the same time asynchronously.
     * Without this function materials are not displayed in the first frame (but displayed after).
     * In consequence it is impossible to get material information in your HTML file
     *
     * @param url The URL of the MTL file
     * @param rootUrl defines where to load data from
     * @param onSuccess Callback function to be called when the MTL file is loaded
     * @param onFailure
     */
    OBJFileLoader.prototype._loadMTL = function (url, rootUrl, onSuccess, onFailure) {
        //The complete path to the mtl file
        var pathOfFile = rootUrl + url;
        // Loads through the babylon tools to allow fileInput search.
        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.LoadFile(pathOfFile, onSuccess, undefined, undefined, false, function (request, exception) {
            onFailure(pathOfFile, exception);
        });
    };
    /**
     * Instantiates a OBJ file loader plugin.
     * @returns the created plugin
     */
    OBJFileLoader.prototype.createPlugin = function () {
        return new OBJFileLoader(OBJFileLoader._DefaultLoadingOptions);
    };
    /**
     * If the data string can be loaded directly.
     * @returns if the data can be loaded directly
     */
    OBJFileLoader.prototype.canDirectLoad = function () {
        return false;
    };
    /**
     * Imports one or more meshes from the loaded OBJ data and adds them to the scene
     * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
     * @param scene the scene the meshes should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise containing the loaded meshes, particles, skeletons and animations
     */
    OBJFileLoader.prototype.importMeshAsync = function (meshesNames, scene, data, rootUrl) {
        //get the meshes from OBJ file
        return this._parseSolid(meshesNames, scene, data, rootUrl).then(function (meshes) {
            return {
                meshes: meshes,
                particleSystems: [],
                skeletons: [],
                animationGroups: [],
                transformNodes: [],
                geometries: [],
                lights: [],
            };
        });
    };
    /**
     * Imports all objects from the loaded OBJ data and adds them to the scene
     * @param scene the scene the objects should be added to
     * @param data the OBJ data to load
     * @param rootUrl root url to load from
     * @returns a promise which completes when objects have been loaded to the scene
     */
    OBJFileLoader.prototype.loadAsync = function (scene, data, rootUrl) {
        //Get the 3D model
        return this.importMeshAsync(null, scene, data, rootUrl).then(function () {
            // return void
        });
    };
    /**
     * Load into an asset container.
     * @param scene The scene to load into
     * @param data The data to import
     * @param rootUrl The root url for scene and resources
     * @returns The loaded asset container
     */
    OBJFileLoader.prototype.loadAssetContainerAsync = function (scene, data, rootUrl) {
        var _this = this;
        var container = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.AssetContainer(scene);
        this._assetContainer = container;
        return this.importMeshAsync(null, scene, data, rootUrl)
            .then(function (result) {
            result.meshes.forEach(function (mesh) { return container.meshes.push(mesh); });
            result.meshes.forEach(function (mesh) {
                var material = mesh.material;
                if (material) {
                    // Materials
                    if (container.materials.indexOf(material) == -1) {
                        container.materials.push(material);
                        // Textures
                        var textures = material.getActiveTextures();
                        textures.forEach(function (t) {
                            if (container.textures.indexOf(t) == -1) {
                                container.textures.push(t);
                            }
                        });
                    }
                }
            });
            _this._assetContainer = null;
            return container;
        })
            .catch(function (ex) {
            _this._assetContainer = null;
            throw ex;
        });
    };
    /**
     * Read the OBJ file and create an Array of meshes.
     * Each mesh contains all information given by the OBJ and the MTL file.
     * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
     * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
     * @param scene defines the scene where are displayed the data
     * @param data defines the content of the obj file
     * @param rootUrl defines the path to the folder
     * @returns the list of loaded meshes
     */
    OBJFileLoader.prototype._parseSolid = function (meshesNames, scene, data, rootUrl) {
        var _this = this;
        var fileToLoad = ""; //The name of the mtlFile to load
        var materialsFromMTLFile = new _mtlFileLoader__WEBPACK_IMPORTED_MODULE_1__.MTLFileLoader();
        var materialToUse = [];
        var babylonMeshesArray = []; //The mesh for babylon
        // Main function
        var solidParser = new _solidParser__WEBPACK_IMPORTED_MODULE_2__.SolidParser(materialToUse, babylonMeshesArray, this._loadingOptions);
        solidParser.parse(meshesNames, data, scene, this._assetContainer, function (fileName) {
            fileToLoad = fileName;
        });
        // load the materials
        var mtlPromises = [];
        // Check if we have a file to load
        if (fileToLoad !== "" && !this._loadingOptions.skipMaterials) {
            //Load the file synchronously
            mtlPromises.push(new Promise(function (resolve, reject) {
                _this._loadMTL(fileToLoad, rootUrl, function (dataLoaded) {
                    try {
                        //Create materials thanks MTLLoader function
                        materialsFromMTLFile.parseMTL(scene, dataLoaded, rootUrl, _this._assetContainer);
                        //Look at each material loaded in the mtl file
                        for (var n = 0; n < materialsFromMTLFile.materials.length; n++) {
                            //Three variables to get all meshes with the same material
                            var startIndex = 0;
                            var _indices = [];
                            var _index = void 0;
                            //The material from MTL file is used in the meshes loaded
                            //Push the indice in an array
                            //Check if the material is not used for another mesh
                            while ((_index = materialToUse.indexOf(materialsFromMTLFile.materials[n].name, startIndex)) > -1) {
                                _indices.push(_index);
                                startIndex = _index + 1;
                            }
                            //If the material is not used dispose it
                            if (_index === -1 && _indices.length === 0) {
                                //If the material is not needed, remove it
                                materialsFromMTLFile.materials[n].dispose();
                            }
                            else {
                                for (var o = 0; o < _indices.length; o++) {
                                    //Apply the material to the Mesh for each mesh with the material
                                    var mesh = babylonMeshesArray[_indices[o]];
                                    var material = materialsFromMTLFile.materials[n];
                                    mesh.material = material;
                                    if (!mesh.getTotalIndices()) {
                                        // No indices, we need to turn on point cloud
                                        material.pointsCloud = true;
                                    }
                                }
                            }
                        }
                        resolve();
                    }
                    catch (e) {
                        babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error processing MTL file: '".concat(fileToLoad, "'"));
                        if (_this._loadingOptions.materialLoadingFailsSilently) {
                            resolve();
                        }
                        else {
                            reject(e);
                        }
                    }
                }, function (pathOfFile, exception) {
                    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Tools.Warn("Error downloading MTL file: '".concat(fileToLoad, "'"));
                    if (_this._loadingOptions.materialLoadingFailsSilently) {
                        resolve();
                    }
                    else {
                        reject(exception);
                    }
                });
            }));
        }
        //Return an array with all Mesh
        return Promise.all(mtlPromises).then(function () {
            return babylonMeshesArray;
        });
    };
    /**
     * Defines if UVs are optimized by default during load.
     */
    OBJFileLoader.OPTIMIZE_WITH_UV = true;
    /**
     * Invert model on y-axis (does a model scaling inversion)
     */
    OBJFileLoader.INVERT_Y = false;
    /**
     * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
     */
    OBJFileLoader.IMPORT_VERTEX_COLORS = false;
    /**
     * Compute the normals for the model, even if normals are present in the file.
     */
    OBJFileLoader.COMPUTE_NORMALS = false;
    /**
     * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
     * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
     */
    OBJFileLoader.OPTIMIZE_NORMALS = false;
    /**
     * Defines custom scaling of UV coordinates of loaded meshes.
     */
    OBJFileLoader.UV_SCALING = new babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.Vector2(1, 1);
    /**
     * Skip loading the materials even if defined in the OBJ file (materials are ignored).
     */
    OBJFileLoader.SKIP_MATERIALS = false;
    /**
     * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
     *
     * Defaults to true for backwards compatibility.
     */
    OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
    return OBJFileLoader;
}());
if (babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader) {
    //Add this loader into the register plugin
    babylonjs_Maths_math_vector__WEBPACK_IMPORTED_MODULE_0__.SceneLoader.RegisterPlugin(new OBJFileLoader());
}


/***/ }),

/***/ "../../../dev/loaders/src/OBJ/objLoadingOptions.ts":
/*!*********************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/objLoadingOptions.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "../../../dev/loaders/src/OBJ/solidParser.ts":
/*!***************************************************!*\
  !*** ../../../dev/loaders/src/OBJ/solidParser.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SolidParser: () => (/* binding */ SolidParser)
/* harmony export */ });
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Misc/logger */ "babylonjs/Misc/observable");
/* harmony import */ var babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__);








/**
 * Class used to load mesh data from OBJ content
 */
var SolidParser = /** @class */ (function () {
    /**
     * Creates a new SolidParser
     * @param materialToUse defines the array to fill with the list of materials to use (it will be filled by the parse function)
     * @param babylonMeshesArray defines the array to fill with the list of loaded meshes (it will be filled by the parse function)
     * @param loadingOptions defines the loading options to use
     */
    function SolidParser(materialToUse, babylonMeshesArray, loadingOptions) {
        this._positions = []; //values for the positions of vertices
        this._normals = []; //Values for the normals
        this._uvs = []; //Values for the textures
        this._colors = [];
        this._meshesFromObj = []; //[mesh] Contains all the obj meshes
        this._indicesForBabylon = []; //The list of indices for VertexData
        this._wrappedPositionForBabylon = []; //The list of position in vectors
        this._wrappedUvsForBabylon = []; //Array with all value of uvs to match with the indices
        this._wrappedColorsForBabylon = []; // Array with all color values to match with the indices
        this._wrappedNormalsForBabylon = []; //Array with all value of normals to match with the indices
        this._tuplePosNorm = []; //Create a tuple with indice of Position, Normal, UV  [pos, norm, uvs]
        this._curPositionInIndices = 0;
        this._hasMeshes = false; //Meshes are defined in the file
        this._unwrappedPositionsForBabylon = []; //Value of positionForBabylon w/o Vector3() [x,y,z]
        this._unwrappedColorsForBabylon = []; // Value of colorForBabylon w/o Color4() [r,g,b,a]
        this._unwrappedNormalsForBabylon = []; //Value of normalsForBabylon w/o Vector3()  [x,y,z]
        this._unwrappedUVForBabylon = []; //Value of uvsForBabylon w/o Vector3()      [x,y,z]
        this._triangles = []; //Indices from new triangles coming from polygons
        this._materialNameFromObj = ""; //The name of the current material
        this._objMeshName = ""; //The name of the current obj mesh
        this._increment = 1; //Id for meshes created by the multimaterial
        this._isFirstMaterial = true;
        this._grayColor = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(0.5, 0.5, 0.5, 1);
        this._materialToUse = materialToUse;
        this._babylonMeshesArray = babylonMeshesArray;
        this._loadingOptions = loadingOptions;
    }
    /**
     * Search for obj in the given array.
     * This function is called to check if a couple of data already exists in an array.
     *
     * If found, returns the index of the founded tuple index. Returns -1 if not found
     * @param arr Array<{ normals: Array<number>, idx: Array<number> }>
     * @param obj Array<number>
     * @returns {boolean}
     */
    SolidParser.prototype._isInArray = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        return idx === -1 ? -1 : arr[obj[0]].idx[idx];
    };
    SolidParser.prototype._isInArrayUV = function (arr, obj) {
        if (!arr[obj[0]]) {
            arr[obj[0]] = { normals: [], idx: [], uv: [] };
        }
        var idx = arr[obj[0]].normals.indexOf(obj[1]);
        if (idx != 1 && obj[2] === arr[obj[0]].uv[idx]) {
            return arr[obj[0]].idx[idx];
        }
        return -1;
    };
    /**
     * This function set the data for each triangle.
     * Data are position, normals and uvs
     * If a tuple of (position, normal) is not set, add the data into the corresponding array
     * If the tuple already exist, add only their indice
     *
     * @param indicePositionFromObj Integer The index in positions array
     * @param indiceUvsFromObj Integer The index in uvs array
     * @param indiceNormalFromObj Integer The index in normals array
     * @param positionVectorFromOBJ Vector3 The value of position at index objIndice
     * @param textureVectorFromOBJ Vector3 The value of uvs
     * @param normalsVectorFromOBJ Vector3 The value of normals at index objNormale
     * @param positionColorsFromOBJ
     */
    SolidParser.prototype._setData = function (indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, positionVectorFromOBJ, textureVectorFromOBJ, normalsVectorFromOBJ, positionColorsFromOBJ) {
        //Check if this tuple already exists in the list of tuples
        var _index;
        if (this._loadingOptions.optimizeWithUV) {
            _index = this._isInArrayUV(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj, indiceUvsFromObj]);
        }
        else {
            _index = this._isInArray(this._tuplePosNorm, [indicePositionFromObj, indiceNormalFromObj]);
        }
        //If it not exists
        if (_index === -1) {
            //Add an new indice.
            //The array of indices is only an array with his length equal to the number of triangles - 1.
            //We add vertices data in this order
            this._indicesForBabylon.push(this._wrappedPositionForBabylon.length);
            //Push the position of vertice for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedPositionForBabylon.push(positionVectorFromOBJ);
            //Push the uvs for Babylon
            //Each element is a Vector3(u,v)
            this._wrappedUvsForBabylon.push(textureVectorFromOBJ);
            //Push the normals for Babylon
            //Each element is a Vector3(x,y,z)
            this._wrappedNormalsForBabylon.push(normalsVectorFromOBJ);
            if (positionColorsFromOBJ !== undefined) {
                //Push the colors for Babylon
                //Each element is a BABYLON.Color4(r,g,b,a)
                this._wrappedColorsForBabylon.push(positionColorsFromOBJ);
            }
            //Add the tuple in the comparison list
            this._tuplePosNorm[indicePositionFromObj].normals.push(indiceNormalFromObj);
            this._tuplePosNorm[indicePositionFromObj].idx.push(this._curPositionInIndices++);
            if (this._loadingOptions.optimizeWithUV) {
                this._tuplePosNorm[indicePositionFromObj].uv.push(indiceUvsFromObj);
            }
        }
        else {
            //The tuple already exists
            //Add the index of the already existing tuple
            //At this index we can get the value of position, normal, color and uvs of vertex
            this._indicesForBabylon.push(_index);
        }
    };
    /**
     * Transform Vector() and BABYLON.Color() objects into numbers in an array
     */
    SolidParser.prototype._unwrapData = function () {
        //Every array has the same length
        for (var l = 0; l < this._wrappedPositionForBabylon.length; l++) {
            //Push the x, y, z values of each element in the unwrapped array
            this._unwrappedPositionsForBabylon.push(this._wrappedPositionForBabylon[l].x, this._wrappedPositionForBabylon[l].y, this._wrappedPositionForBabylon[l].z);
            this._unwrappedNormalsForBabylon.push(this._wrappedNormalsForBabylon[l].x, this._wrappedNormalsForBabylon[l].y, this._wrappedNormalsForBabylon[l].z);
            this._unwrappedUVForBabylon.push(this._wrappedUvsForBabylon[l].x, this._wrappedUvsForBabylon[l].y); //z is an optional value not supported by BABYLON
            if (this._loadingOptions.importVertexColors) {
                //Push the r, g, b, a values of each element in the unwrapped array
                this._unwrappedColorsForBabylon.push(this._wrappedColorsForBabylon[l].r, this._wrappedColorsForBabylon[l].g, this._wrappedColorsForBabylon[l].b, this._wrappedColorsForBabylon[l].a);
            }
        }
        // Reset arrays for the next new meshes
        this._wrappedPositionForBabylon.length = 0;
        this._wrappedNormalsForBabylon.length = 0;
        this._wrappedUvsForBabylon.length = 0;
        this._wrappedColorsForBabylon.length = 0;
        this._tuplePosNorm.length = 0;
        this._curPositionInIndices = 0;
    };
    /**
     * Create triangles from polygons
     * It is important to notice that a triangle is a polygon
     * We get 5 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * facePattern5 = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-4/-4/-4","-5/-5/-5","-6/-6/-6"]
     * Each pattern is divided by the same method
     * @param faces Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    SolidParser.prototype._getTriangles = function (faces, v) {
        //Work for each element of the array
        for (var faceIndex = v; faceIndex < faces.length - 1; faceIndex++) {
            //Add on the triangle variable the indexes to obtain triangles
            this._triangles.push(faces[0], faces[faceIndex], faces[faceIndex + 1]);
        }
        //Result obtained after 2 iterations:
        //Pattern1 => triangle = ["1","2","3","1","3","4"];
        //Pattern2 => triangle = ["1/1","2/2","3/3","1/1","3/3","4/4"];
        //Pattern3 => triangle = ["1/1/1","2/2/2","3/3/3","1/1/1","3/3/3","4/4/4"];
        //Pattern4 => triangle = ["1//1","2//2","3//3","1//1","3//3","4//4"];
        //Pattern5 => triangle = ["-1/-1/-1","-2/-2/-2","-3/-3/-3","-1/-1/-1","-3/-3/-3","-4/-4/-4"];
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 1
     * In this pattern we get vertice positions
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern1 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        //For each element in the triangles array.
        //This var could contains 1 to an infinity of triangles
        for (var k = 0; k < this._triangles.length; k++) {
            // Set position indice
            var indicePositionFromObj = parseInt(this._triangles[k]) - 1;
            this._setData(indicePositionFromObj, 0, 0, // In the pattern 1, normals and uvs are not defined
            this._positions[indicePositionFromObj], // Get the vectors data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), // Create default vectors
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 2
     * In this pattern we get vertice positions and uvs
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern2 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1"
            //Split the data for getting position and uv
            var point = this._triangles[k].split("/"); // ["1", "1"]
            //Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            //Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, 0, //Default value for normals
            this._positions[indicePositionFromObj], //Get the values for each element
            this._uvs[indiceUvsFromObj], babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3.Up(), //Default value for normals
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern3 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1/1/1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["1", "1", "1"]
            // Set position indice
            var indicePositionFromObj = parseInt(point[0]) - 1;
            // Set uv indice
            var indiceUvsFromObj = parseInt(point[1]) - 1;
            // Set normal indice
            var indiceNormalFromObj = parseInt(point[2]) - 1;
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj] //Set the vector for each component
            );
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /**
     * Create triangles and push the data for each polygon for the pattern 4
     * In this pattern we get vertice positions and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern4 = function (face, v) {
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "1//1"
            //Split the data for getting position and normals
            var point = this._triangles[k].split("//"); // ["1", "1"]
            // We check indices, and normals
            var indicePositionFromObj = parseInt(point[0]) - 1;
            var indiceNormalFromObj = parseInt(point[1]) - 1;
            this._setData(indicePositionFromObj, 1, //Default value for uv
            indiceNormalFromObj, this._positions[indicePositionFromObj], //Get each vector of data
            babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2.Zero(), this._normals[indiceNormalFromObj], this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    /*
     * Create triangles and push the data for each polygon for the pattern 3
     * In this pattern we get vertice positions, uvs and normals
     * @param face
     * @param v
     */
    SolidParser.prototype._setDataForCurrentFaceWithPattern5 = function (face, v) {
        //Get the indices of triangles for each polygon
        this._getTriangles(face, v);
        for (var k = 0; k < this._triangles.length; k++) {
            //triangle[k] = "-1/-1/-1"
            //Split the data for getting position, uv, and normals
            var point = this._triangles[k].split("/"); // ["-1", "-1", "-1"]
            // Set position indice
            var indicePositionFromObj = this._positions.length + parseInt(point[0]);
            // Set uv indice
            var indiceUvsFromObj = this._uvs.length + parseInt(point[1]);
            // Set normal indice
            var indiceNormalFromObj = this._normals.length + parseInt(point[2]);
            this._setData(indicePositionFromObj, indiceUvsFromObj, indiceNormalFromObj, this._positions[indicePositionFromObj], this._uvs[indiceUvsFromObj], this._normals[indiceNormalFromObj], //Set the vector for each component
            this._loadingOptions.importVertexColors ? this._colors[indicePositionFromObj] : undefined);
        }
        //Reset variable for the next line
        this._triangles.length = 0;
    };
    SolidParser.prototype._addPreviousObjMesh = function () {
        //Check if it is not the first mesh. Otherwise we don't have data.
        if (this._meshesFromObj.length > 0) {
            //Get the previous mesh for applying the data about the faces
            //=> in obj file, faces definition append after the name of the mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            //Set the data into Array for the mesh
            this._unwrapData();
            // Reverse tab. Otherwise face are displayed in the wrong sens
            this._indicesForBabylon.reverse();
            //Set the information for the mesh
            //Slice the array to avoid rewriting because of the fact this is the same var which be rewrited
            this._handledMesh.indices = this._indicesForBabylon.slice();
            this._handledMesh.positions = this._unwrappedPositionsForBabylon.slice();
            this._handledMesh.normals = this._unwrappedNormalsForBabylon.slice();
            this._handledMesh.uvs = this._unwrappedUVForBabylon.slice();
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon.slice();
            }
            //Reset the array for the next mesh
            this._indicesForBabylon.length = 0;
            this._unwrappedPositionsForBabylon.length = 0;
            this._unwrappedColorsForBabylon.length = 0;
            this._unwrappedNormalsForBabylon.length = 0;
            this._unwrappedUVForBabylon.length = 0;
        }
    };
    SolidParser.prototype._optimizeNormals = function (mesh) {
        var positions = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind);
        var normals = mesh.getVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind);
        var mapVertices = {};
        if (!positions || !normals) {
            return;
        }
        for (var i = 0; i < positions.length / 3; i++) {
            var x = positions[i * 3 + 0];
            var y = positions[i * 3 + 1];
            var z = positions[i * 3 + 2];
            var key = x + "_" + y + "_" + z;
            var lst = mapVertices[key];
            if (!lst) {
                lst = [];
                mapVertices[key] = lst;
            }
            lst.push(i);
        }
        var normal = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        for (var key in mapVertices) {
            var lst = mapVertices[key];
            if (lst.length < 2) {
                continue;
            }
            var v0Idx = lst[0];
            for (var i = 1; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[v0Idx * 3 + 0] += normals[vIdx * 3 + 0];
                normals[v0Idx * 3 + 1] += normals[vIdx * 3 + 1];
                normals[v0Idx * 3 + 2] += normals[vIdx * 3 + 2];
            }
            normal.copyFromFloats(normals[v0Idx * 3 + 0], normals[v0Idx * 3 + 1], normals[v0Idx * 3 + 2]);
            normal.normalize();
            for (var i = 0; i < lst.length; ++i) {
                var vIdx = lst[i];
                normals[vIdx * 3 + 0] = normal.x;
                normals[vIdx * 3 + 1] = normal.y;
                normals[vIdx * 3 + 2] = normal.z;
            }
        }
        mesh.setVerticesData(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind, normals);
    };
    /**
     * Function used to parse an OBJ string
     * @param meshesNames defines the list of meshes to load (all if not defined)
     * @param data defines the OBJ string
     * @param scene defines the hosting scene
     * @param assetContainer defines the asset container to load data in
     * @param onFileToLoadFound defines a callback that will be called if a MTL file is found
     */
    SolidParser.prototype.parse = function (meshesNames, data, scene, assetContainer, onFileToLoadFound) {
        var _a;
        // Split the file into lines
        var lines = data.split("\n");
        // Look at each line
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim().replace(/\s\s/g, " ");
            var result = void 0;
            // Comment or newLine
            if (line.length === 0 || line.charAt(0) === "#") {
                continue;
                //Get information about one position possible for the vertices
            }
            else if (SolidParser.VertexPattern.test(line)) {
                result = line.match(/[^ ]+/g); // match will return non-null due to passing regex pattern
                // Value of result with line: "v 1.0 2.0 3.0"
                // ["v", "1.0", "2.0", "3.0"]
                // Create a Vector3 with the position x, y, z
                this._positions.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
                if (this._loadingOptions.importVertexColors) {
                    if (result.length >= 7) {
                        var r = parseFloat(result[4]);
                        var g = parseFloat(result[5]);
                        var b = parseFloat(result[6]);
                        this._colors.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color4(r > 1 ? r / 255 : r, g > 1 ? g / 255 : g, b > 1 ? b / 255 : b, result.length === 7 || result[7] === undefined ? 1 : parseFloat(result[7])));
                    }
                    else {
                        // TODO: maybe push NULL and if all are NULL to skip (and remove grayColor var).
                        this._colors.push(this._grayColor);
                    }
                }
            }
            else if ((result = SolidParser.NormalPattern.exec(line)) !== null) {
                //Create a Vector3 with the normals x, y, z
                //Value of result
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                //Add the Vector in the list of normals
                this._normals.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector3(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3])));
            }
            else if ((result = SolidParser.UVPattern.exec(line)) !== null) {
                //Create a Vector2 with the normals u, v
                //Value of result
                // ["vt 0.1 0.2 0.3", "0.1", "0.2"]
                //Add the Vector in the list of uvs
                this._uvs.push(new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Vector2(parseFloat(result[1]) * this._loadingOptions.UVScaling.x, parseFloat(result[2]) * this._loadingOptions.UVScaling.y));
                //Identify patterns of faces
                //Face could be defined in different type of pattern
            }
            else if ((result = SolidParser.FacePattern3.exec(line)) !== null) {
                //Value of result:
                //["f 1/1/1 2/2/2 3/3/3", "1/1/1 2/2/2 3/3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2", "3/3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern4.exec(line)) !== null) {
                //Value of result:
                //["f 1//1 2//2 3//3", "1//1 2//2 3//3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern4(result[1].trim().split(" "), // ["1//1", "2//2", "3//3"]
                1);
            }
            else if ((result = SolidParser.FacePattern5.exec(line)) !== null) {
                //Value of result:
                //["f -1/-1/-1 -2/-2/-2 -3/-3/-3", "-1/-1/-1 -2/-2/-2 -3/-3/-3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern5(result[1].trim().split(" "), // ["-1/-1/-1", "-2/-2/-2", "-3/-3/-3"]
                1);
            }
            else if ((result = SolidParser.FacePattern2.exec(line)) !== null) {
                //Value of result:
                //["f 1/1 2/2 3/3", "1/1 2/2 3/3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2", "3/3"]
                1);
            }
            else if ((result = SolidParser.FacePattern1.exec(line)) !== null) {
                //Value of result
                //["f 1 2 3", "1 2 3"...]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2", "3"]
                1);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern1.exec(line)) !== null) {
                //Value of result
                //["l 1 2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern1(result[1].trim().split(" "), // ["1", "2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern2.exec(line)) !== null) {
                //Value of result
                //["l 1/1 2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern2(result[1].trim().split(" "), // ["1/1", "2/2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if ((result = SolidParser.LinePattern3.exec(line)) !== null) {
                //Value of result
                //["l 1/1/1 2/2/2"]
                //Set the data for this face
                this._setDataForCurrentFaceWithPattern3(result[1].trim().split(" "), // ["1/1/1", "2/2/2"]
                0);
                // Define a mesh or an object
                // Each time this keyword is analyzed, create a new Object with all data for creating a babylonMesh
            }
            else if (SolidParser.GroupDescriptor.test(line) || SolidParser.ObjectDescriptor.test(line)) {
                // Create a new mesh corresponding to the name of the group.
                // Definition of the mesh
                var objMesh = {
                    name: line.substring(2).trim(),
                    indices: undefined,
                    positions: undefined,
                    normals: undefined,
                    uvs: undefined,
                    colors: undefined,
                    materialName: this._materialNameFromObj,
                    isObject: SolidParser.ObjectDescriptor.test(line),
                };
                this._addPreviousObjMesh();
                //Push the last mesh created with only the name
                this._meshesFromObj.push(objMesh);
                //Set this variable to indicate that now meshesFromObj has objects defined inside
                this._hasMeshes = true;
                this._isFirstMaterial = true;
                this._increment = 1;
                //Keyword for applying a material
            }
            else if (SolidParser.UseMtlDescriptor.test(line)) {
                //Get the name of the material
                this._materialNameFromObj = line.substring(7).trim();
                //If this new material is in the same mesh
                if (!this._isFirstMaterial || !this._hasMeshes) {
                    //Set the data for the previous mesh
                    this._addPreviousObjMesh();
                    //Create a new mesh
                    var objMesh = 
                    //Set the name of the current obj mesh
                    {
                        name: (this._objMeshName || "mesh") + "_mm" + this._increment.toString(),
                        indices: undefined,
                        positions: undefined,
                        normals: undefined,
                        uvs: undefined,
                        colors: undefined,
                        materialName: this._materialNameFromObj,
                        isObject: false,
                    };
                    this._increment++;
                    //If meshes are already defined
                    this._meshesFromObj.push(objMesh);
                    this._hasMeshes = true;
                }
                //Set the material name if the previous line define a mesh
                if (this._hasMeshes && this._isFirstMaterial) {
                    //Set the material name to the previous mesh (1 material per mesh)
                    this._meshesFromObj[this._meshesFromObj.length - 1].materialName = this._materialNameFromObj;
                    this._isFirstMaterial = false;
                }
                // Keyword for loading the mtl file
            }
            else if (SolidParser.MtlLibGroupDescriptor.test(line)) {
                // Get the name of mtl file
                onFileToLoadFound(line.substring(7).trim());
                // Apply smoothing
            }
            else if (SolidParser.SmoothDescriptor.test(line)) {
                // smooth shading => apply smoothing
                // Today I don't know it work with babylon and with obj.
                // With the obj file  an integer is set
            }
            else {
                //If there is another possibility
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Logger.Log("Unhandled expression at line : " + line);
            }
        }
        // At the end of the file, add the last mesh into the meshesFromObj array
        if (this._hasMeshes) {
            // Set the data for the last mesh
            this._handledMesh = this._meshesFromObj[this._meshesFromObj.length - 1];
            //Reverse indices for displaying faces in the good sense
            this._indicesForBabylon.reverse();
            //Get the good array
            this._unwrapData();
            //Set array
            this._handledMesh.indices = this._indicesForBabylon;
            this._handledMesh.positions = this._unwrappedPositionsForBabylon;
            this._handledMesh.normals = this._unwrappedNormalsForBabylon;
            this._handledMesh.uvs = this._unwrappedUVForBabylon;
            if (this._loadingOptions.importVertexColors) {
                this._handledMesh.colors = this._unwrappedColorsForBabylon;
            }
        }
        // If any o or g keyword not found, create a mesh with a random id
        if (!this._hasMeshes) {
            var newMaterial = null;
            if (this._indicesForBabylon.length) {
                // reverse tab of indices
                this._indicesForBabylon.reverse();
                //Get positions normals uvs
                this._unwrapData();
            }
            else {
                // There is no indices in the file. We will have to switch to point cloud rendering
                for (var _i = 0, _b = this._positions; _i < _b.length; _i++) {
                    var pos = _b[_i];
                    this._unwrappedPositionsForBabylon.push(pos.x, pos.y, pos.z);
                }
                if (this._normals.length) {
                    for (var _c = 0, _d = this._normals; _c < _d.length; _c++) {
                        var normal = _d[_c];
                        this._unwrappedNormalsForBabylon.push(normal.x, normal.y, normal.z);
                    }
                }
                if (this._uvs.length) {
                    for (var _e = 0, _f = this._uvs; _e < _f.length; _e++) {
                        var uv = _f[_e];
                        this._unwrappedUVForBabylon.push(uv.x, uv.y);
                    }
                }
                if (this._colors.length) {
                    for (var _g = 0, _h = this._colors; _g < _h.length; _g++) {
                        var color = _h[_g];
                        this._unwrappedColorsForBabylon.push(color.r, color.g, color.b, color.a);
                    }
                }
                if (!this._materialNameFromObj) {
                    // Create a material with point cloud on
                    newMaterial = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.StandardMaterial(babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(), scene);
                    newMaterial.pointsCloud = true;
                    this._materialNameFromObj = newMaterial.name;
                    if (!this._normals.length) {
                        newMaterial.disableLighting = true;
                        newMaterial.emissiveColor = babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Color3.White();
                    }
                }
            }
            //Set data for one mesh
            this._meshesFromObj.push({
                name: babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Geometry.RandomId(),
                indices: this._indicesForBabylon,
                positions: this._unwrappedPositionsForBabylon,
                colors: this._unwrappedColorsForBabylon,
                normals: this._unwrappedNormalsForBabylon,
                uvs: this._unwrappedUVForBabylon,
                materialName: this._materialNameFromObj,
                directMaterial: newMaterial,
                isObject: true,
            });
        }
        //Set data for each mesh
        for (var j = 0; j < this._meshesFromObj.length; j++) {
            //check meshesNames (stlFileLoader)
            if (meshesNames && this._meshesFromObj[j].name) {
                if (meshesNames instanceof Array) {
                    if (meshesNames.indexOf(this._meshesFromObj[j].name) === -1) {
                        continue;
                    }
                }
                else {
                    if (this._meshesFromObj[j].name !== meshesNames) {
                        continue;
                    }
                }
            }
            //Get the current mesh
            //Set the data with VertexBuffer for each mesh
            this._handledMesh = this._meshesFromObj[j];
            //Create a Mesh with the name of the obj mesh
            scene._blockEntityCollection = !!assetContainer;
            var babylonMesh = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._meshesFromObj[j].name, scene);
            babylonMesh._parentContainer = assetContainer;
            scene._blockEntityCollection = false;
            this._handledMesh._babylonMesh = babylonMesh;
            // If this is a group mesh, it should have an object mesh as a parent. So look for the first object mesh that appears before it.
            if (!this._handledMesh.isObject) {
                for (var k = j - 1; k >= 0; --k) {
                    if (this._meshesFromObj[k].isObject && this._meshesFromObj[k]._babylonMesh) {
                        babylonMesh.parent = this._meshesFromObj[k]._babylonMesh;
                        break;
                    }
                }
            }
            //Push the name of the material to an array
            //This is indispensable for the importMesh function
            this._materialToUse.push(this._meshesFromObj[j].materialName);
            if (((_a = this._handledMesh.positions) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                //Push the mesh into an array
                this._babylonMeshesArray.push(babylonMesh);
                continue;
            }
            var vertexData = new babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData(); //The container for the values
            //Set the data for the babylonMesh
            vertexData.uvs = this._handledMesh.uvs;
            vertexData.indices = this._handledMesh.indices;
            vertexData.positions = this._handledMesh.positions;
            if (this._loadingOptions.computeNormals) {
                var normals = new Array();
                babylonjs_Buffers_buffer__WEBPACK_IMPORTED_MODULE_0__.VertexData.ComputeNormals(this._handledMesh.positions, this._handledMesh.indices, normals);
                vertexData.normals = normals;
            }
            else {
                vertexData.normals = this._handledMesh.normals;
            }
            if (this._loadingOptions.importVertexColors) {
                vertexData.colors = this._handledMesh.colors;
            }
            //Set the data from the VertexBuffer to the current Mesh
            vertexData.applyToMesh(babylonMesh);
            if (this._loadingOptions.invertY) {
                babylonMesh.scaling.y *= -1;
            }
            if (this._loadingOptions.optimizeNormals) {
                this._optimizeNormals(babylonMesh);
            }
            //Push the mesh into an array
            this._babylonMeshesArray.push(babylonMesh);
            if (this._handledMesh.directMaterial) {
                babylonMesh.material = this._handledMesh.directMaterial;
            }
        }
    };
    // Descriptor
    /** Object descriptor */
    SolidParser.ObjectDescriptor = /^o/;
    /** Group descriptor */
    SolidParser.GroupDescriptor = /^g/;
    /** Material lib descriptor */
    SolidParser.MtlLibGroupDescriptor = /^mtllib /;
    /** Use a material descriptor */
    SolidParser.UseMtlDescriptor = /^usemtl /;
    /** Smooth descriptor */
    SolidParser.SmoothDescriptor = /^s /;
    // Patterns
    /** Pattern used to detect a vertex */
    SolidParser.VertexPattern = /^v(\s+[\d|.|+|\-|e|E]+){3,7}/;
    /** Pattern used to detect a normal */
    SolidParser.NormalPattern = /^vn(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a UV set */
    SolidParser.UVPattern = /^vt(\s+[\d|.|+|\-|e|E]+)( +[\d|.|+|\-|e|E]+)/;
    /** Pattern used to detect a first kind of face (f vertex vertex vertex) */
    SolidParser.FacePattern1 = /^f\s+(([\d]{1,}[\s]?){3,})+/;
    /** Pattern used to detect a second kind of face (f vertex/uvs vertex/uvs vertex/uvs) */
    SolidParser.FacePattern2 = /^f\s+((([\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a third kind of face (f vertex/uvs/normal vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.FacePattern3 = /^f\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fourth kind of face (f vertex//normal vertex//normal vertex//normal)*/
    SolidParser.FacePattern4 = /^f\s+((([\d]{1,}\/\/[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a fifth kind of face (f -vertex/-uvs/-normal -vertex/-uvs/-normal -vertex/-uvs/-normal) */
    SolidParser.FacePattern5 = /^f\s+(((-[\d]{1,}\/-[\d]{1,}\/-[\d]{1,}[\s]?){3,})+)/;
    /** Pattern used to detect a line(l vertex vertex) */
    SolidParser.LinePattern1 = /^l\s+(([\d]{1,}[\s]?){2,})+/;
    /** Pattern used to detect a second kind of line (l vertex/uvs vertex/uvs) */
    SolidParser.LinePattern2 = /^l\s+((([\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    /** Pattern used to detect a third kind of line (l vertex/uvs/normal vertex/uvs/normal) */
    SolidParser.LinePattern3 = /^l\s+((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?){2,})+)/;
    return SolidParser;
}());


/***/ }),

/***/ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts":
/*!***************************************************************!*\
  !*** ../../../lts/loaders/src/legacy/legacy-objFileLoader.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MTLFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.MTLFileLoader),
/* harmony export */   OBJFileLoader: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.OBJFileLoader),
/* harmony export */   SolidParser: () => (/* reexport safe */ loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__.SolidParser)
/* harmony export */ });
/* harmony import */ var loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! loaders/OBJ/index */ "../../../dev/loaders/src/OBJ/index.ts");
/* eslint-disable import/no-internal-modules */

/**
 * This is the entry point for the UMD module.
 * The entry point for a future ESM package should be index.ts
 */
var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
if (typeof globalObject !== "undefined") {
    for (var key in loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__) {
        if (!globalObject.BABYLON[key]) {
            globalObject.BABYLON[key] = loaders_OBJ_index__WEBPACK_IMPORTED_MODULE_0__[key];
        }
    }
}



/***/ }),

/***/ "babylonjs/Misc/observable":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Misc_observable__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/objFileLoader.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   loaders: () => (/* reexport module object */ _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/loaders/legacy/legacy-objFileLoader */ "../../../lts/loaders/src/legacy/legacy-objFileLoader.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_loaders_legacy_legacy_objFileLoader__WEBPACK_IMPORTED_MODULE_0__);

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5vYmpGaWxlTG9hZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBSUE7O0FBRUE7QUFDQTtBQUFBO0FBTUE7O0FBRUE7QUFDQTtBQStNQTtBQTdNQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBdE5BOztBQUVBO0FBQ0E7QUFvTkE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pPQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBRUE7QUFHQTs7O0FBR0E7QUFDQTtBQTZEQTs7OztBQUlBO0FBQ0E7QUFsQkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFFQTtBQVVBO0FBQ0E7QUF4REE7QUFIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBSkE7QUF3REE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBQTtBQUVBOzs7Ozs7Ozs7O0FBVUE7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMVNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBWUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBRUE7Ozs7QUFJQTtBQUNBO0FBNlBBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsVUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQWVBOztBQUVBO0FBQ0E7QUFpRUE7Ozs7O0FBS0E7QUFDQTtBQWpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7OztBQWFBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUlBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFPQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7OztBQU9BO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQS8wQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE4eUJBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2gzQkE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7QUNoQkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0xPQURFUlMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0xPQURFUlMvLi4vLi4vLi4vZGV2L2xvYWRlcnMvc3JjL09CSi9pbmRleC50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovbXRsRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovb2JqRmlsZUxvYWRlci50cyIsIndlYnBhY2s6Ly9MT0FERVJTLy4uLy4uLy4uL2Rldi9sb2FkZXJzL3NyYy9PQkovc29saWRQYXJzZXIudHMiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uLi8uLi8uLi9sdHMvbG9hZGVycy9zcmMvbGVnYWN5L2xlZ2FjeS1vYmpGaWxlTG9hZGVyLnRzIiwid2VicGFjazovL0xPQURFUlMvZXh0ZXJuYWwgdW1kIHtcInJvb3RcIjpcIkJBQllMT05cIixcImNvbW1vbmpzXCI6XCJiYWJ5bG9uanNcIixcImNvbW1vbmpzMlwiOlwiYmFieWxvbmpzXCIsXCJhbWRcIjpcImJhYnlsb25qc1wifSIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vTE9BREVSUy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL0xPQURFUlMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9MT0FERVJTL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vTE9BREVSUy8uL3NyYy9vYmpGaWxlTG9hZGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJhYnlsb25qcy1sb2FkZXJzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbG9hZGVyc1wiXSA9IGZhY3RvcnkocmVxdWlyZShcImJhYnlsb25qc1wiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiTE9BREVSU1wiXSA9IGZhY3Rvcnkocm9vdFtcIkJBQllMT05cIl0pO1xufSkoKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0aGlzKSwgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01pc2Nfb2JzZXJ2YWJsZV9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0ICogZnJvbSBcIi4vbXRsRmlsZUxvYWRlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9vYmpMb2FkaW5nT3B0aW9uc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb2xpZFBhcnNlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9vYmpGaWxlTG9hZGVyXCI7XHJcbiIsImltcG9ydCB0eXBlIHsgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgeyBDb2xvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFRleHR1cmUgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvVGV4dHVyZXMvdGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuXHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuLyoqXHJcbiAqIENsYXNzIHJlYWRpbmcgYW5kIHBhcnNpbmcgdGhlIE1UTCBmaWxlIGJ1bmRsZWQgd2l0aCB0aGUgb2JqIGZpbGUuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTVRMRmlsZUxvYWRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEludmVydCBZLUF4aXMgb2YgcmVmZXJlbmNlZCB0ZXh0dXJlcyBvbiBsb2FkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSU5WRVJUX1RFWFRVUkVfWSA9IHRydWU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGwgbWF0ZXJpYWwgbG9hZGVkIGZyb20gdGhlIG10bCB3aWxsIGJlIHNldCBoZXJlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtYXRlcmlhbHM6IFN0YW5kYXJkTWF0ZXJpYWxbXSA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIHJlYWQgdGhlIG10bCBmaWxlIGFuZCBjcmVhdGUgZWFjaCBtYXRlcmlhbCBkZXNjcmliZWQgaW5zaWRlXHJcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGNvdWxkIGJlIGltcHJvdmUgYnkgYWRkaW5nIDpcclxuICAgICAqIC1zb21lIGNvbXBvbmVudCBtaXNzaW5nIChOaSwgVGYuLi4pXHJcbiAgICAgKiAtaW5jbHVkaW5nIHRoZSBzcGVjaWZpYyBvcHRpb25zIGF2YWlsYWJsZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBzY2VuZSB0aGUgbWF0ZXJpYWwgd2lsbCBiZSBjcmVhdGVkIGluXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkZWZpbmVzIHRoZSBtdGwgZGF0YSB0byBwYXJzZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcm9vdHVybCB0byB1c2UgaW4gb3JkZXIgdG8gbG9hZCByZWxhdGl2ZSBkZXBlbmRlbmNpZXNcclxuICAgICAqIEBwYXJhbSBhc3NldENvbnRhaW5lciBkZWZpbmVzIHRoZSBhc3NldCBjb250YWluZXIgdG8gc3RvcmUgdGhlIG1hdGVyaWFsIGluIChjYW4gYmUgbnVsbClcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBhcnNlTVRMKHNjZW5lOiBTY2VuZSwgZGF0YTogc3RyaW5nIHwgQXJyYXlCdWZmZXIsIHJvb3RVcmw6IHN0cmluZywgYXNzZXRDb250YWluZXI6IE51bGxhYmxlPEFzc2V0Q29udGFpbmVyPik6IHZvaWQge1xyXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9TcGxpdCB0aGUgbGluZXMgZnJvbSB0aGUgZmlsZVxyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdChcIlxcblwiKTtcclxuICAgICAgICAvLyB3aGl0ZXNwYWNlIGNoYXIgaWU6IFsgXFx0XFxyXFxuXFxmXVxyXG4gICAgICAgIGNvbnN0IGRlbGltaXRlcl9wYXR0ZXJuID0gL1xccysvO1xyXG4gICAgICAgIC8vQXJyYXkgd2l0aCBSR0IgY29sb3JzXHJcbiAgICAgICAgbGV0IGNvbG9yOiBudW1iZXJbXTtcclxuICAgICAgICAvL05ldyBtYXRlcmlhbFxyXG4gICAgICAgIGxldCBtYXRlcmlhbDogTnVsbGFibGU8U3RhbmRhcmRNYXRlcmlhbD4gPSBudWxsO1xyXG5cclxuICAgICAgICAvL0xvb2sgYXQgZWFjaCBsaW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbaV0udHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQmxhbmsgbGluZSBvciBjb21tZW50XHJcbiAgICAgICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCB8fCBsaW5lLmNoYXJBdCgwKSA9PT0gXCIjXCIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgZmlyc3QgcGFyYW1ldGVyIChrZXl3b3JkKVxyXG4gICAgICAgICAgICBjb25zdCBwb3MgPSBsaW5lLmluZGV4T2YoXCIgXCIpO1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gcG9zID49IDAgPyBsaW5lLnN1YnN0cmluZygwLCBwb3MpIDogbGluZTtcclxuICAgICAgICAgICAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgZGF0YSBmb2xsb3dpbmcgdGhlIGtleVxyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gcG9zID49IDAgPyBsaW5lLnN1YnN0cmluZyhwb3MgKyAxKS50cmltKCkgOiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgLy9UaGlzIG10bCBrZXl3b3JkIHdpbGwgY3JlYXRlIHRoZSBuZXcgbWF0ZXJpYWxcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJuZXdtdGxcIikge1xyXG4gICAgICAgICAgICAgICAgLy9DaGVjayBpZiBpdCBpcyB0aGUgZmlyc3QgbWF0ZXJpYWwuXHJcbiAgICAgICAgICAgICAgICAvLyBNYXRlcmlhbHMgc3BlY2lmaWNhdGlvbnMgYXJlIGRlc2NyaWJlZCBhZnRlciB0aGlzIGtleXdvcmQuXHJcbiAgICAgICAgICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0FkZCB0aGUgcHJldmlvdXMgbWF0ZXJpYWwgaW4gdGhlIG1hdGVyaWFsIGFycmF5LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBuZXcgbWF0ZXJpYWwuXHJcbiAgICAgICAgICAgICAgICAvLyB2YWx1ZSBpcyB0aGUgbmFtZSBvZiB0aGUgbWF0ZXJpYWwgcmVhZCBpbiB0aGUgbXRsIGZpbGVcclxuXHJcbiAgICAgICAgICAgICAgICBzY2VuZS5fYmxvY2tFbnRpdHlDb2xsZWN0aW9uID0gISFhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFN0YW5kYXJkTWF0ZXJpYWwodmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLl9wYXJlbnRDb250YWluZXIgPSBhc3NldENvbnRhaW5lcjtcclxuICAgICAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia2RcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlmZnVzZSBjb2xvciAoY29sb3IgdW5kZXIgd2hpdGUgbGlnaHQpIHVzaW5nIFJHQiB2YWx1ZXNcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhbHVlICA9IFwiciBnIGJcIlxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSA8bnVtYmVyW10+dmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgPSBbcixnLGJdXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0Z2hlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia2FcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQW1iaWVudCBjb2xvciAoY29sb3IgdW5kZXIgc2hhZG93KSB1c2luZyBSR0IgdmFsdWVzXHJcblxyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSA9IFwiciBnIGJcIlxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSA8bnVtYmVyW10+dmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIC8vY29sb3IgPSBbcixnLGJdXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0Z2hlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbWJpZW50Q29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwia3NcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gU3BlY3VsYXIgY29sb3IgKGNvbG9yIHdoZW4gbGlnaHQgaXMgcmVmbGVjdGVkIGZyb20gc2hpbnkgc3VyZmFjZSkgdXNpbmcgUkdCIHZhbHVlc1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFsdWUgPSBcInIgZyBiXCJcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gPG51bWJlcltdPnZhbHVlLnNwbGl0KGRlbGltaXRlcl9wYXR0ZXJuLCAzKS5tYXAocGFyc2VGbG9hdCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbG9yID0gW3IsZyxiXVxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGNvbG9yIGludG8gdGhlIG1hdGVyaWFsXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhckNvbG9yID0gQ29sb3IzLkZyb21BcnJheShjb2xvcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImtlXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIEVtaXNzaXZlIGNvbG9yIHVzaW5nIFJHQiB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIGNvbG9yID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4sIDMpLm1hcChwYXJzZUZsb2F0KTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmVtaXNzaXZlQ29sb3IgPSBDb2xvcjMuRnJvbUFycmF5KGNvbG9yKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibnNcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy92YWx1ZSA9IFwiSW50ZWdlclwiXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zcGVjdWxhclBvd2VyID0gcGFyc2VGbG9hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImRcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy9kIGlzIGRpc3NvbHZlIGZvciBjdXJyZW50IG1hdGVyaWFsLiBJdCBtZWFuIGFscGhhIGZvciBCQUJZTE9OXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5hbHBoYSA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vVGV4dHVyZVxyXG4gICAgICAgICAgICAgICAgLy9UaGlzIHBhcnQgY2FuIGJlIGltcHJvdmVkIGJ5IGFkZGluZyB0aGUgcG9zc2libGUgb3B0aW9ucyBvZiB0ZXh0dXJlXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9rYVwiICYmIG1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBhbWJpZW50IHRleHR1cmUgbWFwIHdpdGggYSBsb2FkZWQgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmFtYmllbnRUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJtYXBfa2RcIiAmJiBtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlmZnVzZSB0ZXh0dXJlIG1hcCB3aXRoIGEgbG9hZGVkIGltYWdlXHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5kaWZmdXNlVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX2tzXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNwZWN1bGFyIHRleHR1cmUgbWFwIHdpdGggYSBsb2FkZWQgaW1hZ2VcclxuICAgICAgICAgICAgICAgIC8vV2UgbXVzdCBmaXJzdCBnZXQgdGhlIGZvbGRlciBvZiB0aGUgaW1hZ2VcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLnNwZWN1bGFyVGV4dHVyZSA9IE1UTEZpbGVMb2FkZXIuX0dldFRleHR1cmUocm9vdFVybCwgdmFsdWUsIHNjZW5lKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwibWFwX25zXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vU3BlY3VsYXJcclxuICAgICAgICAgICAgICAgIC8vU3BlY3VsYXIgaGlnaGxpZ2h0IGNvbXBvbmVudFxyXG4gICAgICAgICAgICAgICAgLy9XZSBtdXN0IGZpcnN0IGdldCB0aGUgZm9sZGVyIG9mIHRoZSBpbWFnZVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vTm90IHN1cHBvcnRlZCBieSBCQUJZTE9OXHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9idW1wXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vVGhlIGJ1bXAgdGV4dHVyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gdmFsdWUuc3BsaXQoZGVsaW1pdGVyX3BhdHRlcm4pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYnVtcE11bHRpcGxpZXJJbmRleCA9IHZhbHVlcy5pbmRleE9mKFwiLWJtXCIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bXBNdWx0aXBsaWVyOiBOdWxsYWJsZTxzdHJpbmc+ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVtcE11bHRpcGxpZXJJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVtcE11bHRpcGxpZXIgPSB2YWx1ZXNbYnVtcE11bHRpcGxpZXJJbmRleCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5zcGxpY2UoYnVtcE11bHRpcGxpZXJJbmRleCwgMik7IC8vIHJlbW92ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLmJ1bXBUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZXMuam9pbihcIiBcIiksIHNjZW5lKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbC5idW1wVGV4dHVyZSAmJiBidW1wTXVsdGlwbGllciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLmJ1bXBUZXh0dXJlLmxldmVsID0gcGFyc2VGbG9hdChidW1wTXVsdGlwbGllcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIm1hcF9kXCIgJiYgbWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBkaXNzb2x2ZSBvZiB0aGUgbWF0ZXJpYWxcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsLm9wYWNpdHlUZXh0dXJlID0gTVRMRmlsZUxvYWRlci5fR2V0VGV4dHVyZShyb290VXJsLCB2YWx1ZSwgc2NlbmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vT3B0aW9ucyBmb3IgaWxsdW1pbmF0aW9uXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImlsbHVtXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vSWxsdW1pbmF0aW9uXHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UaGF0IG1lYW4gS2QgPT0gS2RcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db2xvciBvbiBhbmQgQW1iaWVudCBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCIyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL0hpZ2hsaWdodCBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCIzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb24gb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogR2xhc3Mgb24sIFJlZmxlY3Rpb246IFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI1XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1JlZmxlY3Rpb246IEZyZXNuZWwgb24gYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI2XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogUmVmcmFjdGlvbiBvbiwgUmVmbGVjdGlvbjogRnJlc25lbCBvZmYgYW5kIFJheSB0cmFjZSBvblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI3XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogUmVmcmFjdGlvbiBvbiwgUmVmbGVjdGlvbjogRnJlc25lbCBvbiBhbmQgUmF5IHRyYWNlIG9uXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIjhcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUmVmbGVjdGlvbiBvbiBhbmQgUmF5IHRyYWNlIG9mZlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCI5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYW5zcGFyZW5jeTogR2xhc3Mgb24sIFJlZmxlY3Rpb246IFJheSB0cmFjZSBvZmZcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiMTBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ2FzdHMgc2hhZG93cyBvbnRvIGludmlzaWJsZSBzdXJmYWNlc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJVbmhhbmRsZWQgZXhwcmVzc2lvbiBhdCBsaW5lIDogXCIgKyBpICsnXFxuJyArIFwid2l0aCB2YWx1ZSA6IFwiICsgbGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy9BdCB0aGUgZW5kIG9mIHRoZSBmaWxlLCBhZGQgdGhlIGxhc3QgbWF0ZXJpYWxcclxuICAgICAgICBpZiAobWF0ZXJpYWwpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdGV4dHVyZSBmb3IgdGhlIG1hdGVyaWFsLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoZSBtYXRlcmlhbCBpcyBpbXBvcnRlZCBmcm9tIGlucHV0IGZpbGUsXHJcbiAgICAgKiBXZSBzYW5pdGl6ZSB0aGUgdXJsIHRvIGVuc3VyZSBpdCB0YWtlcyB0aGUgdGV4dHVyZSBmcm9tIGFzaWRlIHRoZSBtYXRlcmlhbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgdG8gbG9hZCBmcm9tXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHN0b3JlZCBpbiB0aGUgbXRsXHJcbiAgICAgKiBAcGFyYW0gc2NlbmVcclxuICAgICAqIEByZXR1cm5zIFRoZSBUZXh0dXJlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIF9HZXRUZXh0dXJlKHJvb3RVcmw6IHN0cmluZywgdmFsdWU6IHN0cmluZywgc2NlbmU6IFNjZW5lKTogTnVsbGFibGU8VGV4dHVyZT4ge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdXJsID0gcm9vdFVybDtcclxuICAgICAgICAvLyBMb2FkIGZyb20gaW5wdXQgZmlsZS5cclxuICAgICAgICBpZiAocm9vdFVybCA9PT0gXCJmaWxlOlwiKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXN0RGVsaW1pdGVyID0gdmFsdWUubGFzdEluZGV4T2YoXCJcXFxcXCIpO1xyXG4gICAgICAgICAgICBpZiAobGFzdERlbGltaXRlciA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIGxhc3REZWxpbWl0ZXIgPSB2YWx1ZS5sYXN0SW5kZXhPZihcIi9cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsYXN0RGVsaW1pdGVyID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHVybCArPSB2YWx1ZS5zdWJzdHIobGFzdERlbGltaXRlciArIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdXJsICs9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE5vdCBmcm9tIGlucHV0IGZpbGUuXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCArPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVGV4dHVyZSh1cmwsIHNjZW5lLCBmYWxzZSwgTVRMRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IE51bGxhYmxlIH0gZnJvbSBcImNvcmUvdHlwZXNcIjtcclxuaW1wb3J0IHsgVmVjdG9yMiB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcImNvcmUvTWlzYy90b29sc1wiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHR5cGUgeyBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYywgSVNjZW5lTG9hZGVyUGx1Z2luRmFjdG9yeSwgSVNjZW5lTG9hZGVyUGx1Z2luLCBJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdCB9IGZyb20gXCJjb3JlL0xvYWRpbmcvc2NlbmVMb2FkZXJcIjtcclxuaW1wb3J0IHsgU2NlbmVMb2FkZXIgfSBmcm9tIFwiY29yZS9Mb2FkaW5nL3NjZW5lTG9hZGVyXCI7XHJcbmltcG9ydCB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBTY2VuZSB9IGZyb20gXCJjb3JlL3NjZW5lXCI7XHJcbmltcG9ydCB0eXBlIHsgV2ViUmVxdWVzdCB9IGZyb20gXCJjb3JlL01pc2Mvd2ViUmVxdWVzdFwiO1xyXG5pbXBvcnQgeyBNVExGaWxlTG9hZGVyIH0gZnJvbSBcIi4vbXRsRmlsZUxvYWRlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE9CSkxvYWRpbmdPcHRpb25zIH0gZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuaW1wb3J0IHsgU29saWRQYXJzZXIgfSBmcm9tIFwiLi9zb2xpZFBhcnNlclwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5cclxuLyoqXHJcbiAqIE9CSiBmaWxlIHR5cGUgbG9hZGVyLlxyXG4gKiBUaGlzIGlzIGEgYmFieWxvbiBzY2VuZSBsb2FkZXIgcGx1Z2luLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9CSkZpbGVMb2FkZXIgaW1wbGVtZW50cyBJU2NlbmVMb2FkZXJQbHVnaW5Bc3luYywgSVNjZW5lTG9hZGVyUGx1Z2luRmFjdG9yeSB7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgaWYgVVZzIGFyZSBvcHRpbWl6ZWQgYnkgZGVmYXVsdCBkdXJpbmcgbG9hZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPUFRJTUlaRV9XSVRIX1VWID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogSW52ZXJ0IG1vZGVsIG9uIHktYXhpcyAoZG9lcyBhIG1vZGVsIHNjYWxpbmcgaW52ZXJzaW9uKVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIElOVkVSVF9ZID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIEludmVydCBZLUF4aXMgb2YgcmVmZXJlbmNlZCB0ZXh0dXJlcyBvbiBsb2FkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IElOVkVSVF9URVhUVVJFX1koKSB7XHJcbiAgICAgICAgcmV0dXJuIE1UTEZpbGVMb2FkZXIuSU5WRVJUX1RFWFRVUkVfWTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCBJTlZFUlRfVEVYVFVSRV9ZKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgTVRMRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbmNsdWRlIGluIG1lc2hlcyB0aGUgdmVydGV4IGNvbG9ycyBhdmFpbGFibGUgaW4gc29tZSBPQkogZmlsZXMuICBUaGlzIGlzIG5vdCBwYXJ0IG9mIE9CSiBzdGFuZGFyZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBJTVBPUlRfVkVSVEVYX0NPTE9SUyA9IGZhbHNlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDb21wdXRlIHRoZSBub3JtYWxzIGZvciB0aGUgbW9kZWwsIGV2ZW4gaWYgbm9ybWFscyBhcmUgcHJlc2VudCBpbiB0aGUgZmlsZS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDT01QVVRFX05PUk1BTFMgPSBmYWxzZTtcclxuICAgIC8qKlxyXG4gICAgICogT3B0aW1pemUgdGhlIG5vcm1hbHMgZm9yIHRoZSBtb2RlbC4gTGlnaHRpbmcgY2FuIGJlIHVuZXZlbiBpZiB5b3UgdXNlIE9wdGltaXplV2l0aFVWID0gdHJ1ZSBiZWNhdXNlIG5ldyB2ZXJ0aWNlcyBjYW4gYmUgY3JlYXRlZCBmb3IgdGhlIHNhbWUgbG9jYXRpb24gaWYgdGhleSBwZXJ0YWluIHRvIGRpZmZlcmVudCBmYWNlcy5cclxuICAgICAqIFVzaW5nIE9wdGltaXplaE5vcm1hbHMgPSB0cnVlIHdpbGwgaGVscCBzbW9vdGhpbmcgdGhlIGxpZ2h0aW5nIGJ5IGF2ZXJhZ2luZyB0aGUgbm9ybWFscyBvZiB0aG9zZSB2ZXJ0aWNlcy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBPUFRJTUlaRV9OT1JNQUxTID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgY3VzdG9tIHNjYWxpbmcgb2YgVVYgY29vcmRpbmF0ZXMgb2YgbG9hZGVkIG1lc2hlcy5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVVl9TQ0FMSU5HID0gbmV3IFZlY3RvcjIoMSwgMSk7XHJcbiAgICAvKipcclxuICAgICAqIFNraXAgbG9hZGluZyB0aGUgbWF0ZXJpYWxzIGV2ZW4gaWYgZGVmaW5lZCBpbiB0aGUgT0JKIGZpbGUgKG1hdGVyaWFscyBhcmUgaWdub3JlZCkuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgU0tJUF9NQVRFUklBTFMgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gYSBtYXRlcmlhbCBmYWlscyB0byBsb2FkIE9CSiBsb2FkZXIgd2lsbCBzaWxlbnRseSBmYWlsIGFuZCBvblN1Y2Nlc3MoKSBjYWxsYmFjayB3aWxsIGJlIHRyaWdnZXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBEZWZhdWx0cyB0byB0cnVlIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBNQVRFUklBTF9MT0FESU5HX0ZBSUxTX1NJTEVOVExZID0gdHJ1ZTtcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyB0aGUgbmFtZSBvZiB0aGUgcGx1Z2luLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZSA9IFwib2JqXCI7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGV4dGVuc2lvbiB0aGUgcGx1Z2luIGlzIGFibGUgdG8gbG9hZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4dGVuc2lvbnMgPSBcIi5vYmpcIjtcclxuXHJcbiAgICBwcml2YXRlIF9hc3NldENvbnRhaW5lcjogTnVsbGFibGU8QXNzZXRDb250YWluZXI+ID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9sb2FkaW5nT3B0aW9uczogT0JKTG9hZGluZ09wdGlvbnM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGxvYWRlciBmb3IgLk9CSiBmaWxlc1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBsb2FkaW5nT3B0aW9ucyBvcHRpb25zIGZvciBsb2FkaW5nIGFuZCBwYXJzaW5nIE9CSi9NVEwgZmlsZXMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGxvYWRpbmdPcHRpb25zPzogT0JKTG9hZGluZ09wdGlvbnMpIHtcclxuICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucyA9IGxvYWRpbmdPcHRpb25zIHx8IE9CSkZpbGVMb2FkZXIuX0RlZmF1bHRMb2FkaW5nT3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXQgX0RlZmF1bHRMb2FkaW5nT3B0aW9ucygpOiBPQkpMb2FkaW5nT3B0aW9ucyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY29tcHV0ZU5vcm1hbHM6IE9CSkZpbGVMb2FkZXIuQ09NUFVURV9OT1JNQUxTLFxyXG4gICAgICAgICAgICBvcHRpbWl6ZU5vcm1hbHM6IE9CSkZpbGVMb2FkZXIuT1BUSU1JWkVfTk9STUFMUyxcclxuICAgICAgICAgICAgaW1wb3J0VmVydGV4Q29sb3JzOiBPQkpGaWxlTG9hZGVyLklNUE9SVF9WRVJURVhfQ09MT1JTLFxyXG4gICAgICAgICAgICBpbnZlcnRZOiBPQkpGaWxlTG9hZGVyLklOVkVSVF9ZLFxyXG4gICAgICAgICAgICBpbnZlcnRUZXh0dXJlWTogT0JKRmlsZUxvYWRlci5JTlZFUlRfVEVYVFVSRV9ZLFxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25hbWluZy1jb252ZW50aW9uXHJcbiAgICAgICAgICAgIFVWU2NhbGluZzogT0JKRmlsZUxvYWRlci5VVl9TQ0FMSU5HLFxyXG4gICAgICAgICAgICBtYXRlcmlhbExvYWRpbmdGYWlsc1NpbGVudGx5OiBPQkpGaWxlTG9hZGVyLk1BVEVSSUFMX0xPQURJTkdfRkFJTFNfU0lMRU5UTFksXHJcbiAgICAgICAgICAgIG9wdGltaXplV2l0aFVWOiBPQkpGaWxlTG9hZGVyLk9QVElNSVpFX1dJVEhfVVYsXHJcbiAgICAgICAgICAgIHNraXBNYXRlcmlhbHM6IE9CSkZpbGVMb2FkZXIuU0tJUF9NQVRFUklBTFMsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHN5bmNocm9ub3VzbHkgdGhlIE1UTCBmaWxlIGF0dGFjaGVkIHRvIHRoaXMgb2JqLlxyXG4gICAgICogTG9hZCBmdW5jdGlvbiBvciBpbXBvcnRNZXNoIGZ1bmN0aW9uIGRvbid0IGVuYWJsZSB0byBsb2FkIDIgZmlsZXMgaW4gdGhlIHNhbWUgdGltZSBhc3luY2hyb25vdXNseS5cclxuICAgICAqIFdpdGhvdXQgdGhpcyBmdW5jdGlvbiBtYXRlcmlhbHMgYXJlIG5vdCBkaXNwbGF5ZWQgaW4gdGhlIGZpcnN0IGZyYW1lIChidXQgZGlzcGxheWVkIGFmdGVyKS5cclxuICAgICAqIEluIGNvbnNlcXVlbmNlIGl0IGlzIGltcG9zc2libGUgdG8gZ2V0IG1hdGVyaWFsIGluZm9ybWF0aW9uIGluIHlvdXIgSFRNTCBmaWxlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHVybCBUaGUgVVJMIG9mIHRoZSBNVEwgZmlsZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB3aGVyZSB0byBsb2FkIGRhdGEgZnJvbVxyXG4gICAgICogQHBhcmFtIG9uU3VjY2VzcyBDYWxsYmFjayBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgTVRMIGZpbGUgaXMgbG9hZGVkXHJcbiAgICAgKiBAcGFyYW0gb25GYWlsdXJlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2xvYWRNVEwoXHJcbiAgICAgICAgdXJsOiBzdHJpbmcsXHJcbiAgICAgICAgcm9vdFVybDogc3RyaW5nLFxyXG4gICAgICAgIG9uU3VjY2VzczogKHJlc3BvbnNlOiBzdHJpbmcgfCBBcnJheUJ1ZmZlciwgcmVzcG9uc2VVcmw/OiBzdHJpbmcpID0+IGFueSxcclxuICAgICAgICBvbkZhaWx1cmU6IChwYXRoT2ZGaWxlOiBzdHJpbmcsIGV4Y2VwdGlvbj86IGFueSkgPT4gdm9pZFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy9UaGUgY29tcGxldGUgcGF0aCB0byB0aGUgbXRsIGZpbGVcclxuICAgICAgICBjb25zdCBwYXRoT2ZGaWxlID0gcm9vdFVybCArIHVybDtcclxuXHJcbiAgICAgICAgLy8gTG9hZHMgdGhyb3VnaCB0aGUgYmFieWxvbiB0b29scyB0byBhbGxvdyBmaWxlSW5wdXQgc2VhcmNoLlxyXG4gICAgICAgIFRvb2xzLkxvYWRGaWxlKHBhdGhPZkZpbGUsIG9uU3VjY2VzcywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZhbHNlLCAocmVxdWVzdD86IFdlYlJlcXVlc3QgfCB1bmRlZmluZWQsIGV4Y2VwdGlvbj86IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBvbkZhaWx1cmUocGF0aE9mRmlsZSwgZXhjZXB0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlcyBhIE9CSiBmaWxlIGxvYWRlciBwbHVnaW4uXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgY3JlYXRlZCBwbHVnaW5cclxuICAgICAqL1xyXG4gICAgY3JlYXRlUGx1Z2luKCk6IElTY2VuZUxvYWRlclBsdWdpbkFzeW5jIHwgSVNjZW5lTG9hZGVyUGx1Z2luIHtcclxuICAgICAgICByZXR1cm4gbmV3IE9CSkZpbGVMb2FkZXIoT0JKRmlsZUxvYWRlci5fRGVmYXVsdExvYWRpbmdPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIHRoZSBkYXRhIHN0cmluZyBjYW4gYmUgbG9hZGVkIGRpcmVjdGx5LlxyXG4gICAgICogQHJldHVybnMgaWYgdGhlIGRhdGEgY2FuIGJlIGxvYWRlZCBkaXJlY3RseVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2FuRGlyZWN0TG9hZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbXBvcnRzIG9uZSBvciBtb3JlIG1lc2hlcyBmcm9tIHRoZSBsb2FkZWQgT0JKIGRhdGEgYW5kIGFkZHMgdGhlbSB0byB0aGUgc2NlbmVcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBhIHN0cmluZyBvciBhcnJheSBvZiBzdHJpbmdzIG9mIHRoZSBtZXNoIG5hbWVzIHRoYXQgc2hvdWxkIGJlIGxvYWRlZCBmcm9tIHRoZSBmaWxlXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBtZXNoZXMgc2hvdWxkIGJlIGFkZGVkIHRvXHJcbiAgICAgKiBAcGFyYW0gZGF0YSB0aGUgT0JKIGRhdGEgdG8gbG9hZFxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgcm9vdCB1cmwgdG8gbG9hZCBmcm9tXHJcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2UgY29udGFpbmluZyB0aGUgbG9hZGVkIG1lc2hlcywgcGFydGljbGVzLCBza2VsZXRvbnMgYW5kIGFuaW1hdGlvbnNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGltcG9ydE1lc2hBc3luYyhtZXNoZXNOYW1lczogYW55LCBzY2VuZTogU2NlbmUsIGRhdGE6IGFueSwgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTxJU2NlbmVMb2FkZXJBc3luY1Jlc3VsdD4ge1xyXG4gICAgICAgIC8vZ2V0IHRoZSBtZXNoZXMgZnJvbSBPQkogZmlsZVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJzZVNvbGlkKG1lc2hlc05hbWVzLCBzY2VuZSwgZGF0YSwgcm9vdFVybCkudGhlbigobWVzaGVzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBtZXNoZXM6IG1lc2hlcyxcclxuICAgICAgICAgICAgICAgIHBhcnRpY2xlU3lzdGVtczogW10sXHJcbiAgICAgICAgICAgICAgICBza2VsZXRvbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uR3JvdXBzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU5vZGVzOiBbXSxcclxuICAgICAgICAgICAgICAgIGdlb21ldHJpZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgbGlnaHRzOiBbXSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEltcG9ydHMgYWxsIG9iamVjdHMgZnJvbSB0aGUgbG9hZGVkIE9CSiBkYXRhIGFuZCBhZGRzIHRoZW0gdG8gdGhlIHNjZW5lXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgdGhlIHNjZW5lIHRoZSBvYmplY3RzIHNob3VsZCBiZSBhZGRlZCB0b1xyXG4gICAgICogQHBhcmFtIGRhdGEgdGhlIE9CSiBkYXRhIHRvIGxvYWRcclxuICAgICAqIEBwYXJhbSByb290VXJsIHJvb3QgdXJsIHRvIGxvYWQgZnJvbVxyXG4gICAgICogQHJldHVybnMgYSBwcm9taXNlIHdoaWNoIGNvbXBsZXRlcyB3aGVuIG9iamVjdHMgaGF2ZSBiZWVuIGxvYWRlZCB0byB0aGUgc2NlbmVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGxvYWRBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZywgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy9HZXQgdGhlIDNEIG1vZGVsXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1wb3J0TWVzaEFzeW5jKG51bGwsIHNjZW5lLCBkYXRhLCByb290VXJsKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIHZvaWRcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgaW50byBhbiBhc3NldCBjb250YWluZXIuXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgVGhlIHNjZW5lIHRvIGxvYWQgaW50b1xyXG4gICAgICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gaW1wb3J0XHJcbiAgICAgKiBAcGFyYW0gcm9vdFVybCBUaGUgcm9vdCB1cmwgZm9yIHNjZW5lIGFuZCByZXNvdXJjZXNcclxuICAgICAqIEByZXR1cm5zIFRoZSBsb2FkZWQgYXNzZXQgY29udGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkQXNzZXRDb250YWluZXJBc3luYyhzY2VuZTogU2NlbmUsIGRhdGE6IHN0cmluZywgcm9vdFVybDogc3RyaW5nKTogUHJvbWlzZTxBc3NldENvbnRhaW5lcj4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IG5ldyBBc3NldENvbnRhaW5lcihzY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fYXNzZXRDb250YWluZXIgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmltcG9ydE1lc2hBc3luYyhudWxsLCBzY2VuZSwgZGF0YSwgcm9vdFVybClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiBjb250YWluZXIubWVzaGVzLnB1c2gobWVzaCkpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1lc2hlcy5mb3JFYWNoKChtZXNoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBtZXNoLm1hdGVyaWFsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXRlcmlhbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lci5tYXRlcmlhbHMuaW5kZXhPZihtYXRlcmlhbCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5tYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGV4dHVyZXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVzID0gbWF0ZXJpYWwuZ2V0QWN0aXZlVGV4dHVyZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmVzLmZvckVhY2goKHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmVyLnRleHR1cmVzLmluZGV4T2YodCkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnRleHR1cmVzLnB1c2godCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Fzc2V0Q29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRocm93IGV4O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlYWQgdGhlIE9CSiBmaWxlIGFuZCBjcmVhdGUgYW4gQXJyYXkgb2YgbWVzaGVzLlxyXG4gICAgICogRWFjaCBtZXNoIGNvbnRhaW5zIGFsbCBpbmZvcm1hdGlvbiBnaXZlbiBieSB0aGUgT0JKIGFuZCB0aGUgTVRMIGZpbGUuXHJcbiAgICAgKiBpLmUuIHZlcnRpY2VzIHBvc2l0aW9ucyBhbmQgaW5kaWNlcywgb3B0aW9uYWwgbm9ybWFscyB2YWx1ZXMsIG9wdGlvbmFsIFVWIHZhbHVlcywgb3B0aW9uYWwgbWF0ZXJpYWxcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBkZWZpbmVzIGEgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3Mgb2YgdGhlIG1lc2ggbmFtZXMgdGhhdCBzaG91bGQgYmUgbG9hZGVkIGZyb20gdGhlIGZpbGVcclxuICAgICAqIEBwYXJhbSBzY2VuZSBkZWZpbmVzIHRoZSBzY2VuZSB3aGVyZSBhcmUgZGlzcGxheWVkIHRoZSBkYXRhXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkZWZpbmVzIHRoZSBjb250ZW50IG9mIHRoZSBvYmogZmlsZVxyXG4gICAgICogQHBhcmFtIHJvb3RVcmwgZGVmaW5lcyB0aGUgcGF0aCB0byB0aGUgZm9sZGVyXHJcbiAgICAgKiBAcmV0dXJucyB0aGUgbGlzdCBvZiBsb2FkZWQgbWVzaGVzXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BhcnNlU29saWQobWVzaGVzTmFtZXM6IGFueSwgc2NlbmU6IFNjZW5lLCBkYXRhOiBzdHJpbmcsIHJvb3RVcmw6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8QWJzdHJhY3RNZXNoPj4ge1xyXG4gICAgICAgIGxldCBmaWxlVG9Mb2FkOiBzdHJpbmcgPSBcIlwiOyAvL1RoZSBuYW1lIG9mIHRoZSBtdGxGaWxlIHRvIGxvYWRcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHNGcm9tTVRMRmlsZTogTVRMRmlsZUxvYWRlciA9IG5ldyBNVExGaWxlTG9hZGVyKCk7XHJcbiAgICAgICAgY29uc3QgbWF0ZXJpYWxUb1VzZTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaGVzQXJyYXk6IEFycmF5PE1lc2g+ID0gW107IC8vVGhlIG1lc2ggZm9yIGJhYnlsb25cclxuXHJcbiAgICAgICAgLy8gTWFpbiBmdW5jdGlvblxyXG4gICAgICAgIGNvbnN0IHNvbGlkUGFyc2VyID0gbmV3IFNvbGlkUGFyc2VyKG1hdGVyaWFsVG9Vc2UsIGJhYnlsb25NZXNoZXNBcnJheSwgdGhpcy5fbG9hZGluZ09wdGlvbnMpO1xyXG5cclxuICAgICAgICBzb2xpZFBhcnNlci5wYXJzZShtZXNoZXNOYW1lcywgZGF0YSwgc2NlbmUsIHRoaXMuX2Fzc2V0Q29udGFpbmVyLCAoZmlsZU5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBmaWxlVG9Mb2FkID0gZmlsZU5hbWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGxvYWQgdGhlIG1hdGVyaWFsc1xyXG4gICAgICAgIGNvbnN0IG10bFByb21pc2VzOiBBcnJheTxQcm9taXNlPHZvaWQ+PiA9IFtdO1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHdlIGhhdmUgYSBmaWxlIHRvIGxvYWRcclxuICAgICAgICBpZiAoZmlsZVRvTG9hZCAhPT0gXCJcIiAmJiAhdGhpcy5fbG9hZGluZ09wdGlvbnMuc2tpcE1hdGVyaWFscykge1xyXG4gICAgICAgICAgICAvL0xvYWQgdGhlIGZpbGUgc3luY2hyb25vdXNseVxyXG4gICAgICAgICAgICBtdGxQcm9taXNlcy5wdXNoKFxyXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRNVEwoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVUb0xvYWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3RVcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhTG9hZGVkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ3JlYXRlIG1hdGVyaWFscyB0aGFua3MgTVRMTG9hZGVyIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxzRnJvbU1UTEZpbGUucGFyc2VNVEwoc2NlbmUsIGRhdGFMb2FkZWQsIHJvb3RVcmwsIHRoaXMuX2Fzc2V0Q29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0xvb2sgYXQgZWFjaCBtYXRlcmlhbCBsb2FkZWQgaW4gdGhlIG10bCBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UaHJlZSB2YXJpYWJsZXMgdG8gZ2V0IGFsbCBtZXNoZXMgd2l0aCB0aGUgc2FtZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9pbmRpY2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBfaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RoZSBtYXRlcmlhbCBmcm9tIE1UTCBmaWxlIGlzIHVzZWQgaW4gdGhlIG1lc2hlcyBsb2FkZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9QdXNoIHRoZSBpbmRpY2UgaW4gYW4gYXJyYXlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DaGVjayBpZiB0aGUgbWF0ZXJpYWwgaXMgbm90IHVzZWQgZm9yIGFub3RoZXIgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKF9pbmRleCA9IG1hdGVyaWFsVG9Vc2UuaW5kZXhPZihtYXRlcmlhbHNGcm9tTVRMRmlsZS5tYXRlcmlhbHNbbl0ubmFtZSwgc3RhcnRJbmRleCkpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbmRpY2VzLnB1c2goX2luZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0SW5kZXggPSBfaW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgdGhlIG1hdGVyaWFsIGlzIG5vdCB1c2VkIGRpc3Bvc2UgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pbmRleCA9PT0gLTEgJiYgX2luZGljZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIHRoZSBtYXRlcmlhbCBpcyBub3QgbmVlZGVkLCByZW1vdmUgaXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsc0Zyb21NVExGaWxlLm1hdGVyaWFsc1tuXS5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IF9pbmRpY2VzLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BcHBseSB0aGUgbWF0ZXJpYWwgdG8gdGhlIE1lc2ggZm9yIGVhY2ggbWVzaCB3aXRoIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc2ggPSBiYWJ5bG9uTWVzaGVzQXJyYXlbX2luZGljZXNbb11dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGVyaWFsID0gbWF0ZXJpYWxzRnJvbU1UTEZpbGUubWF0ZXJpYWxzW25dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2gubWF0ZXJpYWwgPSBtYXRlcmlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXNoLmdldFRvdGFsSW5kaWNlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vIGluZGljZXMsIHdlIG5lZWQgdG8gdHVybiBvbiBwb2ludCBjbG91ZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbC5wb2ludHNDbG91ZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBFcnJvciBwcm9jZXNzaW5nIE1UTCBmaWxlOiAnJHtmaWxlVG9Mb2FkfSdgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMubWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHBhdGhPZkZpbGU6IHN0cmluZywgZXhjZXB0aW9uPzogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUb29scy5XYXJuKGBFcnJvciBkb3dubG9hZGluZyBNVEwgZmlsZTogJyR7ZmlsZVRvTG9hZH0nYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMubWF0ZXJpYWxMb2FkaW5nRmFpbHNTaWxlbnRseSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXR1cm4gYW4gYXJyYXkgd2l0aCBhbGwgTWVzaFxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChtdGxQcm9taXNlcykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBiYWJ5bG9uTWVzaGVzQXJyYXk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmlmIChTY2VuZUxvYWRlcikge1xyXG4gICAgLy9BZGQgdGhpcyBsb2FkZXIgaW50byB0aGUgcmVnaXN0ZXIgcGx1Z2luXHJcbiAgICBTY2VuZUxvYWRlci5SZWdpc3RlclBsdWdpbihuZXcgT0JKRmlsZUxvYWRlcigpKTtcclxufVxyXG4iLCJpbXBvcnQgdHlwZSB7IEFzc2V0Q29udGFpbmVyIH0gZnJvbSBcImNvcmUvYXNzZXRDb250YWluZXJcIjtcclxuaW1wb3J0IHsgVmVydGV4QnVmZmVyIH0gZnJvbSBcImNvcmUvQnVmZmVycy9idWZmZXJcIjtcclxuaW1wb3J0IHR5cGUgeyBNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbFwiO1xyXG5pbXBvcnQgeyBTdGFuZGFyZE1hdGVyaWFsIH0gZnJvbSBcImNvcmUvTWF0ZXJpYWxzL3N0YW5kYXJkTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgQ29sb3IzLCBDb2xvcjQgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLmNvbG9yXCI7XHJcbmltcG9ydCB7IFZlY3RvcjIsIFZlY3RvcjMgfSBmcm9tIFwiY29yZS9NYXRocy9tYXRoLnZlY3RvclwiO1xyXG5pbXBvcnQgdHlwZSB7IEFic3RyYWN0TWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9hYnN0cmFjdE1lc2hcIjtcclxuaW1wb3J0IHsgR2VvbWV0cnkgfSBmcm9tIFwiY29yZS9NZXNoZXMvZ2VvbWV0cnlcIjtcclxuaW1wb3J0IHsgTWVzaCB9IGZyb20gXCJjb3JlL01lc2hlcy9tZXNoXCI7XHJcbmltcG9ydCB7IFZlcnRleERhdGEgfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaC52ZXJ0ZXhEYXRhXCI7XHJcbmltcG9ydCB0eXBlIHsgU2NlbmUgfSBmcm9tIFwiY29yZS9zY2VuZVwiO1xyXG5pbXBvcnQgdHlwZSB7IEZsb2F0QXJyYXksIEluZGljZXNBcnJheSwgTnVsbGFibGUgfSBmcm9tIFwiY29yZS90eXBlc1wiO1xyXG5pbXBvcnQgdHlwZSB7IE9CSkxvYWRpbmdPcHRpb25zIH0gZnJvbSBcIi4vb2JqTG9hZGluZ09wdGlvbnNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcImNvcmUvTWlzYy9sb2dnZXJcIjtcclxuXHJcbnR5cGUgTWVzaE9iamVjdCA9IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGluZGljZXM/OiBBcnJheTxudW1iZXI+O1xyXG4gICAgcG9zaXRpb25zPzogQXJyYXk8bnVtYmVyPjtcclxuICAgIG5vcm1hbHM/OiBBcnJheTxudW1iZXI+O1xyXG4gICAgY29sb3JzPzogQXJyYXk8bnVtYmVyPjtcclxuICAgIHV2cz86IEFycmF5PG51bWJlcj47XHJcbiAgICBtYXRlcmlhbE5hbWU6IHN0cmluZztcclxuICAgIGRpcmVjdE1hdGVyaWFsPzogTnVsbGFibGU8TWF0ZXJpYWw+O1xyXG4gICAgaXNPYmplY3Q6IGJvb2xlYW47IC8vIElmIHRoZSBlbnRpdHkgaXMgZGVmaW5lZCBhcyBhbiBvYmplY3QgKFwib1wiKSwgb3IgZ3JvdXAgKFwiZ1wiKVxyXG4gICAgX2JhYnlsb25NZXNoPzogQWJzdHJhY3RNZXNoOyAvLyBUaGUgY29ycmVzcG9uZGluZyBCYWJ5bG9uIG1lc2hcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGFzcyB1c2VkIHRvIGxvYWQgbWVzaCBkYXRhIGZyb20gT0JKIGNvbnRlbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTb2xpZFBhcnNlciB7XHJcbiAgICAvLyBEZXNjcmlwdG9yXHJcbiAgICAvKiogT2JqZWN0IGRlc2NyaXB0b3IgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgT2JqZWN0RGVzY3JpcHRvciA9IC9eby87XHJcbiAgICAvKiogR3JvdXAgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBHcm91cERlc2NyaXB0b3IgPSAvXmcvO1xyXG4gICAgLyoqIE1hdGVyaWFsIGxpYiBkZXNjcmlwdG9yICovXHJcbiAgICBwdWJsaWMgc3RhdGljIE10bExpYkdyb3VwRGVzY3JpcHRvciA9IC9ebXRsbGliIC87XHJcbiAgICAvKiogVXNlIGEgbWF0ZXJpYWwgZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBVc2VNdGxEZXNjcmlwdG9yID0gL151c2VtdGwgLztcclxuICAgIC8qKiBTbW9vdGggZGVzY3JpcHRvciAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTbW9vdGhEZXNjcmlwdG9yID0gL15zIC87XHJcblxyXG4gICAgLy8gUGF0dGVybnNcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdmVydGV4ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFZlcnRleFBhdHRlcm4gPSAvXnYoXFxzK1tcXGR8LnwrfFxcLXxlfEVdKyl7Myw3fS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIG5vcm1hbCAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBOb3JtYWxQYXR0ZXJuID0gL152bihcXHMrW1xcZHwufCt8XFwtfGV8RV0rKSggK1tcXGR8LnwrfFxcLXxlfEVdKykoICtbXFxkfC58K3xcXC18ZXxFXSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgVVYgc2V0ICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFVWUGF0dGVybiA9IC9ednQoXFxzK1tcXGR8LnwrfFxcLXxlfEVdKykoICtbXFxkfC58K3xcXC18ZXxFXSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgZmlyc3Qga2luZCBvZiBmYWNlIChmIHZlcnRleCB2ZXJ0ZXggdmVydGV4KSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjEgPSAvXmZcXHMrKChbXFxkXXsxLH1bXFxzXT8pezMsfSkrLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgc2Vjb25kIGtpbmQgb2YgZmFjZSAoZiB2ZXJ0ZXgvdXZzIHZlcnRleC91dnMgdmVydGV4L3V2cykgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm4yID0gL15mXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdGhpcmQga2luZCBvZiBmYWNlIChmIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBGYWNlUGF0dGVybjMgPSAvXmZcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXszLH0pKykvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBmb3VydGgga2luZCBvZiBmYWNlIChmIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsIHZlcnRleC8vbm9ybWFsKSovXHJcbiAgICBwdWJsaWMgc3RhdGljIEZhY2VQYXR0ZXJuNCA9IC9eZlxccysoKChbXFxkXXsxLH1cXC9cXC9bXFxkXXsxLH1bXFxzXT8pezMsfSkrKS87XHJcbiAgICAvKiogUGF0dGVybiB1c2VkIHRvIGRldGVjdCBhIGZpZnRoIGtpbmQgb2YgZmFjZSAoZiAtdmVydGV4Ly11dnMvLW5vcm1hbCAtdmVydGV4Ly11dnMvLW5vcm1hbCAtdmVydGV4Ly11dnMvLW5vcm1hbCkgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRmFjZVBhdHRlcm41ID0gL15mXFxzKygoKC1bXFxkXXsxLH1cXC8tW1xcZF17MSx9XFwvLVtcXGRdezEsfVtcXHNdPyl7Myx9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgbGluZShsIHZlcnRleCB2ZXJ0ZXgpICovXHJcbiAgICBwdWJsaWMgc3RhdGljIExpbmVQYXR0ZXJuMSA9IC9ebFxccysoKFtcXGRdezEsfVtcXHNdPyl7Mix9KSsvO1xyXG4gICAgLyoqIFBhdHRlcm4gdXNlZCB0byBkZXRlY3QgYSBzZWNvbmQga2luZCBvZiBsaW5lIChsIHZlcnRleC91dnMgdmVydGV4L3V2cykgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgTGluZVBhdHRlcm4yID0gL15sXFxzKygoKFtcXGRdezEsfVxcL1tcXGRdezEsfVtcXHNdPyl7Mix9KSspLztcclxuICAgIC8qKiBQYXR0ZXJuIHVzZWQgdG8gZGV0ZWN0IGEgdGhpcmQga2luZCBvZiBsaW5lIChsIHZlcnRleC91dnMvbm9ybWFsIHZlcnRleC91dnMvbm9ybWFsKSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBMaW5lUGF0dGVybjMgPSAvXmxcXHMrKCgoW1xcZF17MSx9XFwvW1xcZF17MSx9XFwvW1xcZF17MSx9W1xcc10/KXsyLH0pKykvO1xyXG5cclxuICAgIHByaXZhdGUgX2xvYWRpbmdPcHRpb25zOiBPQkpMb2FkaW5nT3B0aW9ucztcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uczogQXJyYXk8VmVjdG9yMz4gPSBbXTsgLy92YWx1ZXMgZm9yIHRoZSBwb3NpdGlvbnMgb2YgdmVydGljZXNcclxuICAgIHByaXZhdGUgX25vcm1hbHM6IEFycmF5PFZlY3RvcjM+ID0gW107IC8vVmFsdWVzIGZvciB0aGUgbm9ybWFsc1xyXG4gICAgcHJpdmF0ZSBfdXZzOiBBcnJheTxWZWN0b3IyPiA9IFtdOyAvL1ZhbHVlcyBmb3IgdGhlIHRleHR1cmVzXHJcbiAgICBwcml2YXRlIF9jb2xvcnM6IEFycmF5PENvbG9yND4gPSBbXTtcclxuICAgIHByaXZhdGUgX21lc2hlc0Zyb21PYmo6IEFycmF5PE1lc2hPYmplY3Q+ID0gW107IC8vW21lc2hdIENvbnRhaW5zIGFsbCB0aGUgb2JqIG1lc2hlc1xyXG4gICAgcHJpdmF0ZSBfaGFuZGxlZE1lc2g6IE1lc2hPYmplY3Q7IC8vVGhlIGN1cnJlbnQgbWVzaCBvZiBtZXNoZXMgYXJyYXlcclxuICAgIHByaXZhdGUgX2luZGljZXNGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vVGhlIGxpc3Qgb2YgaW5kaWNlcyBmb3IgVmVydGV4RGF0YVxyXG4gICAgcHJpdmF0ZSBfd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbjogQXJyYXk8VmVjdG9yMz4gPSBbXTsgLy9UaGUgbGlzdCBvZiBwb3NpdGlvbiBpbiB2ZWN0b3JzXHJcbiAgICBwcml2YXRlIF93cmFwcGVkVXZzRm9yQmFieWxvbjogQXJyYXk8VmVjdG9yMj4gPSBbXTsgLy9BcnJheSB3aXRoIGFsbCB2YWx1ZSBvZiB1dnMgdG8gbWF0Y2ggd2l0aCB0aGUgaW5kaWNlc1xyXG4gICAgcHJpdmF0ZSBfd3JhcHBlZENvbG9yc0ZvckJhYnlsb246IEFycmF5PENvbG9yND4gPSBbXTsgLy8gQXJyYXkgd2l0aCBhbGwgY29sb3IgdmFsdWVzIHRvIG1hdGNoIHdpdGggdGhlIGluZGljZXNcclxuICAgIHByaXZhdGUgX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbjogQXJyYXk8VmVjdG9yMz4gPSBbXTsgLy9BcnJheSB3aXRoIGFsbCB2YWx1ZSBvZiBub3JtYWxzIHRvIG1hdGNoIHdpdGggdGhlIGluZGljZXNcclxuICAgIHByaXZhdGUgX3R1cGxlUG9zTm9ybTogQXJyYXk8eyBub3JtYWxzOiBBcnJheTxudW1iZXI+OyBpZHg6IEFycmF5PG51bWJlcj47IHV2OiBBcnJheTxudW1iZXI+IH0+ID0gW107IC8vQ3JlYXRlIGEgdHVwbGUgd2l0aCBpbmRpY2Ugb2YgUG9zaXRpb24sIE5vcm1hbCwgVVYgIFtwb3MsIG5vcm0sIHV2c11cclxuICAgIHByaXZhdGUgX2N1clBvc2l0aW9uSW5JbmRpY2VzID0gMDtcclxuICAgIHByaXZhdGUgX2hhc01lc2hlczogQm9vbGVhbiA9IGZhbHNlOyAvL01lc2hlcyBhcmUgZGVmaW5lZCBpbiB0aGUgZmlsZVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbjogQXJyYXk8bnVtYmVyPiA9IFtdOyAvL1ZhbHVlIG9mIHBvc2l0aW9uRm9yQmFieWxvbiB3L28gVmVjdG9yMygpIFt4LHksel1cclxuICAgIHByaXZhdGUgX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb246IEFycmF5PG51bWJlcj4gPSBbXTsgLy8gVmFsdWUgb2YgY29sb3JGb3JCYWJ5bG9uIHcvbyBDb2xvcjQoKSBbcixnLGIsYV1cclxuICAgIHByaXZhdGUgX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vVmFsdWUgb2Ygbm9ybWFsc0ZvckJhYnlsb24gdy9vIFZlY3RvcjMoKSAgW3gseSx6XVxyXG4gICAgcHJpdmF0ZSBfdW53cmFwcGVkVVZGb3JCYWJ5bG9uOiBBcnJheTxudW1iZXI+ID0gW107IC8vVmFsdWUgb2YgdXZzRm9yQmFieWxvbiB3L28gVmVjdG9yMygpICAgICAgW3gseSx6XVxyXG4gICAgcHJpdmF0ZSBfdHJpYW5nbGVzOiBBcnJheTxzdHJpbmc+ID0gW107IC8vSW5kaWNlcyBmcm9tIG5ldyB0cmlhbmdsZXMgY29taW5nIGZyb20gcG9seWdvbnNcclxuICAgIHByaXZhdGUgX21hdGVyaWFsTmFtZUZyb21PYmo6IHN0cmluZyA9IFwiXCI7IC8vVGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgbWF0ZXJpYWxcclxuICAgIHByaXZhdGUgX29iak1lc2hOYW1lOiBzdHJpbmcgPSBcIlwiOyAvL1RoZSBuYW1lIG9mIHRoZSBjdXJyZW50IG9iaiBtZXNoXHJcbiAgICBwcml2YXRlIF9pbmNyZW1lbnQ6IG51bWJlciA9IDE7IC8vSWQgZm9yIG1lc2hlcyBjcmVhdGVkIGJ5IHRoZSBtdWx0aW1hdGVyaWFsXHJcbiAgICBwcml2YXRlIF9pc0ZpcnN0TWF0ZXJpYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSBfZ3JheUNvbG9yID0gbmV3IENvbG9yNCgwLjUsIDAuNSwgMC41LCAxKTtcclxuICAgIHByaXZhdGUgX21hdGVyaWFsVG9Vc2U6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfYmFieWxvbk1lc2hlc0FycmF5OiBBcnJheTxNZXNoPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgU29saWRQYXJzZXJcclxuICAgICAqIEBwYXJhbSBtYXRlcmlhbFRvVXNlIGRlZmluZXMgdGhlIGFycmF5IHRvIGZpbGwgd2l0aCB0aGUgbGlzdCBvZiBtYXRlcmlhbHMgdG8gdXNlIChpdCB3aWxsIGJlIGZpbGxlZCBieSB0aGUgcGFyc2UgZnVuY3Rpb24pXHJcbiAgICAgKiBAcGFyYW0gYmFieWxvbk1lc2hlc0FycmF5IGRlZmluZXMgdGhlIGFycmF5IHRvIGZpbGwgd2l0aCB0aGUgbGlzdCBvZiBsb2FkZWQgbWVzaGVzIChpdCB3aWxsIGJlIGZpbGxlZCBieSB0aGUgcGFyc2UgZnVuY3Rpb24pXHJcbiAgICAgKiBAcGFyYW0gbG9hZGluZ09wdGlvbnMgZGVmaW5lcyB0aGUgbG9hZGluZyBvcHRpb25zIHRvIHVzZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IobWF0ZXJpYWxUb1VzZTogc3RyaW5nW10sIGJhYnlsb25NZXNoZXNBcnJheTogQXJyYXk8TWVzaD4sIGxvYWRpbmdPcHRpb25zOiBPQkpMb2FkaW5nT3B0aW9ucykge1xyXG4gICAgICAgIHRoaXMuX21hdGVyaWFsVG9Vc2UgPSBtYXRlcmlhbFRvVXNlO1xyXG4gICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheSA9IGJhYnlsb25NZXNoZXNBcnJheTtcclxuICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucyA9IGxvYWRpbmdPcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VhcmNoIGZvciBvYmogaW4gdGhlIGdpdmVuIGFycmF5LlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgdG8gY2hlY2sgaWYgYSBjb3VwbGUgb2YgZGF0YSBhbHJlYWR5IGV4aXN0cyBpbiBhbiBhcnJheS5cclxuICAgICAqXHJcbiAgICAgKiBJZiBmb3VuZCwgcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZvdW5kZWQgdHVwbGUgaW5kZXguIFJldHVybnMgLTEgaWYgbm90IGZvdW5kXHJcbiAgICAgKiBAcGFyYW0gYXJyIEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPiwgaWR4OiBBcnJheTxudW1iZXI+IH0+XHJcbiAgICAgKiBAcGFyYW0gb2JqIEFycmF5PG51bWJlcj5cclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9pc0luQXJyYXkoYXJyOiBBcnJheTx7IG5vcm1hbHM6IEFycmF5PG51bWJlcj47IGlkeDogQXJyYXk8bnVtYmVyPiB9Piwgb2JqOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKCFhcnJbb2JqWzBdXSkge1xyXG4gICAgICAgICAgICBhcnJbb2JqWzBdXSA9IHsgbm9ybWFsczogW10sIGlkeDogW10gfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaWR4ID0gYXJyW29ialswXV0ubm9ybWFscy5pbmRleE9mKG9ialsxXSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpZHggPT09IC0xID8gLTEgOiBhcnJbb2JqWzBdXS5pZHhbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc0luQXJyYXlVVihhcnI6IEFycmF5PHsgbm9ybWFsczogQXJyYXk8bnVtYmVyPjsgaWR4OiBBcnJheTxudW1iZXI+OyB1djogQXJyYXk8bnVtYmVyPiB9Piwgb2JqOiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICAgICAgaWYgKCFhcnJbb2JqWzBdXSkge1xyXG4gICAgICAgICAgICBhcnJbb2JqWzBdXSA9IHsgbm9ybWFsczogW10sIGlkeDogW10sIHV2OiBbXSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpZHggPSBhcnJbb2JqWzBdXS5ub3JtYWxzLmluZGV4T2Yob2JqWzFdKTtcclxuXHJcbiAgICAgICAgaWYgKGlkeCAhPSAxICYmIG9ialsyXSA9PT0gYXJyW29ialswXV0udXZbaWR4XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyW29ialswXV0uaWR4W2lkeF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgZnVuY3Rpb24gc2V0IHRoZSBkYXRhIGZvciBlYWNoIHRyaWFuZ2xlLlxyXG4gICAgICogRGF0YSBhcmUgcG9zaXRpb24sIG5vcm1hbHMgYW5kIHV2c1xyXG4gICAgICogSWYgYSB0dXBsZSBvZiAocG9zaXRpb24sIG5vcm1hbCkgaXMgbm90IHNldCwgYWRkIHRoZSBkYXRhIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgYXJyYXlcclxuICAgICAqIElmIHRoZSB0dXBsZSBhbHJlYWR5IGV4aXN0LCBhZGQgb25seSB0aGVpciBpbmRpY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW5kaWNlUG9zaXRpb25Gcm9tT2JqIEludGVnZXIgVGhlIGluZGV4IGluIHBvc2l0aW9ucyBhcnJheVxyXG4gICAgICogQHBhcmFtIGluZGljZVV2c0Zyb21PYmogSW50ZWdlciBUaGUgaW5kZXggaW4gdXZzIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gaW5kaWNlTm9ybWFsRnJvbU9iaiBJbnRlZ2VyIFRoZSBpbmRleCBpbiBub3JtYWxzIGFycmF5XHJcbiAgICAgKiBAcGFyYW0gcG9zaXRpb25WZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIHBvc2l0aW9uIGF0IGluZGV4IG9iakluZGljZVxyXG4gICAgICogQHBhcmFtIHRleHR1cmVWZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIHV2c1xyXG4gICAgICogQHBhcmFtIG5vcm1hbHNWZWN0b3JGcm9tT0JKIFZlY3RvcjMgVGhlIHZhbHVlIG9mIG5vcm1hbHMgYXQgaW5kZXggb2JqTm9ybWFsZVxyXG4gICAgICogQHBhcmFtIHBvc2l0aW9uQ29sb3JzRnJvbU9CSlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhKFxyXG4gICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iajogbnVtYmVyLFxyXG4gICAgICAgIGluZGljZVV2c0Zyb21PYmo6IG51bWJlcixcclxuICAgICAgICBpbmRpY2VOb3JtYWxGcm9tT2JqOiBudW1iZXIsXHJcbiAgICAgICAgcG9zaXRpb25WZWN0b3JGcm9tT0JKOiBWZWN0b3IzLFxyXG4gICAgICAgIHRleHR1cmVWZWN0b3JGcm9tT0JKOiBWZWN0b3IyLFxyXG4gICAgICAgIG5vcm1hbHNWZWN0b3JGcm9tT0JKOiBWZWN0b3IzLFxyXG4gICAgICAgIHBvc2l0aW9uQ29sb3JzRnJvbU9CSj86IENvbG9yNFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy9DaGVjayBpZiB0aGlzIHR1cGxlIGFscmVhZHkgZXhpc3RzIGluIHRoZSBsaXN0IG9mIHR1cGxlc1xyXG4gICAgICAgIGxldCBfaW5kZXg6IG51bWJlcjtcclxuICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMub3B0aW1pemVXaXRoVVYpIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gdGhpcy5faXNJbkFycmF5VVYodGhpcy5fdHVwbGVQb3NOb3JtLCBbaW5kaWNlUG9zaXRpb25Gcm9tT2JqLCBpbmRpY2VOb3JtYWxGcm9tT2JqLCBpbmRpY2VVdnNGcm9tT2JqXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgX2luZGV4ID0gdGhpcy5faXNJbkFycmF5KHRoaXMuX3R1cGxlUG9zTm9ybSwgW2luZGljZVBvc2l0aW9uRnJvbU9iaiwgaW5kaWNlTm9ybWFsRnJvbU9ial0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9JZiBpdCBub3QgZXhpc3RzXHJcbiAgICAgICAgaWYgKF9pbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy9BZGQgYW4gbmV3IGluZGljZS5cclxuICAgICAgICAgICAgLy9UaGUgYXJyYXkgb2YgaW5kaWNlcyBpcyBvbmx5IGFuIGFycmF5IHdpdGggaGlzIGxlbmd0aCBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIHRyaWFuZ2xlcyAtIDEuXHJcbiAgICAgICAgICAgIC8vV2UgYWRkIHZlcnRpY2VzIGRhdGEgaW4gdGhpcyBvcmRlclxyXG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5wdXNoKHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb24ubGVuZ3RoKTtcclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBwb3NpdGlvbiBvZiB2ZXJ0aWNlIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgVmVjdG9yMyh4LHkseilcclxuICAgICAgICAgICAgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbi5wdXNoKHBvc2l0aW9uVmVjdG9yRnJvbU9CSik7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgdXZzIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgIC8vRWFjaCBlbGVtZW50IGlzIGEgVmVjdG9yMyh1LHYpXHJcbiAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRVdnNGb3JCYWJ5bG9uLnB1c2godGV4dHVyZVZlY3RvckZyb21PQkopO1xyXG4gICAgICAgICAgICAvL1B1c2ggdGhlIG5vcm1hbHMgZm9yIEJhYnlsb25cclxuICAgICAgICAgICAgLy9FYWNoIGVsZW1lbnQgaXMgYSBWZWN0b3IzKHgseSx6KVxyXG4gICAgICAgICAgICB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ucHVzaChub3JtYWxzVmVjdG9yRnJvbU9CSik7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb25Db2xvcnNGcm9tT0JKICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgY29sb3JzIGZvciBCYWJ5bG9uXHJcbiAgICAgICAgICAgICAgICAvL0VhY2ggZWxlbWVudCBpcyBhIEJBQllMT04uQ29sb3I0KHIsZyxiLGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5wdXNoKHBvc2l0aW9uQ29sb3JzRnJvbU9CSik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSB0dXBsZSBpbiB0aGUgY29tcGFyaXNvbiBsaXN0XHJcbiAgICAgICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybVtpbmRpY2VQb3NpdGlvbkZyb21PYmpdLm5vcm1hbHMucHVzaChpbmRpY2VOb3JtYWxGcm9tT2JqKTtcclxuICAgICAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtW2luZGljZVBvc2l0aW9uRnJvbU9ial0uaWR4LnB1c2godGhpcy5fY3VyUG9zaXRpb25JbkluZGljZXMrKyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5vcHRpbWl6ZVdpdGhVVikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHVwbGVQb3NOb3JtW2luZGljZVBvc2l0aW9uRnJvbU9ial0udXYucHVzaChpbmRpY2VVdnNGcm9tT2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vVGhlIHR1cGxlIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgICAgIC8vQWRkIHRoZSBpbmRleCBvZiB0aGUgYWxyZWFkeSBleGlzdGluZyB0dXBsZVxyXG4gICAgICAgICAgICAvL0F0IHRoaXMgaW5kZXggd2UgY2FuIGdldCB0aGUgdmFsdWUgb2YgcG9zaXRpb24sIG5vcm1hbCwgY29sb3IgYW5kIHV2cyBvZiB2ZXJ0ZXhcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucHVzaChfaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYW5zZm9ybSBWZWN0b3IoKSBhbmQgQkFCWUxPTi5Db2xvcigpIG9iamVjdHMgaW50byBudW1iZXJzIGluIGFuIGFycmF5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3Vud3JhcERhdGEoKSB7XHJcbiAgICAgICAgLy9FdmVyeSBhcnJheSBoYXMgdGhlIHNhbWUgbGVuZ3RoXHJcbiAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aDsgbCsrKSB7XHJcbiAgICAgICAgICAgIC8vUHVzaCB0aGUgeCwgeSwgeiB2YWx1ZXMgb2YgZWFjaCBlbGVtZW50IGluIHRoZSB1bndyYXBwZWQgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5wdXNoKHRoaXMuX3dyYXBwZWRQb3NpdGlvbkZvckJhYnlsb25bbF0ueCwgdGhpcy5fd3JhcHBlZFBvc2l0aW9uRm9yQmFieWxvbltsXS55LCB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uW2xdLnopO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5wdXNoKHRoaXMuX3dyYXBwZWROb3JtYWxzRm9yQmFieWxvbltsXS54LCB0aGlzLl93cmFwcGVkTm9ybWFsc0ZvckJhYnlsb25bbF0ueSwgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uW2xdLnopO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ucHVzaCh0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS54LCB0aGlzLl93cmFwcGVkVXZzRm9yQmFieWxvbltsXS55KTsgLy96IGlzIGFuIG9wdGlvbmFsIHZhbHVlIG5vdCBzdXBwb3J0ZWQgYnkgQkFCWUxPTlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAvL1B1c2ggdGhlIHIsIGcsIGIsIGEgdmFsdWVzIG9mIGVhY2ggZWxlbWVudCBpbiB0aGUgdW53cmFwcGVkIGFycmF5XHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb25bbF0ucixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbltsXS5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uW2xdLmIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd3JhcHBlZENvbG9yc0ZvckJhYnlsb25bbF0uYVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZXNldCBhcnJheXMgZm9yIHRoZSBuZXh0IG5ldyBtZXNoZXNcclxuICAgICAgICB0aGlzLl93cmFwcGVkUG9zaXRpb25Gb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fd3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5fd3JhcHBlZFV2c0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl93cmFwcGVkQ29sb3JzRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX3R1cGxlUG9zTm9ybS5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2N1clBvc2l0aW9uSW5JbmRpY2VzID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgZnJvbSBwb2x5Z29uc1xyXG4gICAgICogSXQgaXMgaW1wb3J0YW50IHRvIG5vdGljZSB0aGF0IGEgdHJpYW5nbGUgaXMgYSBwb2x5Z29uXHJcbiAgICAgKiBXZSBnZXQgNSBwYXR0ZXJucyBvZiBmYWNlIGRlZmluZWQgaW4gT0JKIEZpbGUgOlxyXG4gICAgICogZmFjZVBhdHRlcm4xID0gW1wiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4yID0gW1wiMS8xXCIsXCIyLzJcIixcIjMvM1wiLFwiNC80XCIsXCI1LzVcIixcIjYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm4zID0gW1wiMS8xLzFcIixcIjIvMi8yXCIsXCIzLzMvM1wiLFwiNC80LzRcIixcIjUvNS81XCIsXCI2LzYvNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm40ID0gW1wiMS8vMVwiLFwiMi8vMlwiLFwiMy8vM1wiLFwiNC8vNFwiLFwiNS8vNVwiLFwiNi8vNlwiXVxyXG4gICAgICogZmFjZVBhdHRlcm41ID0gW1wiLTEvLTEvLTFcIixcIi0yLy0yLy0yXCIsXCItMy8tMy8tM1wiLFwiLTQvLTQvLTRcIixcIi01Ly01Ly01XCIsXCItNi8tNi8tNlwiXVxyXG4gICAgICogRWFjaCBwYXR0ZXJuIGlzIGRpdmlkZWQgYnkgdGhlIHNhbWUgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gZmFjZXMgQXJyYXlbU3RyaW5nXSBUaGUgaW5kaWNlcyBvZiBlbGVtZW50c1xyXG4gICAgICogQHBhcmFtIHYgSW50ZWdlciBUaGUgdmFyaWFibGUgdG8gaW5jcmVtZW50XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2dldFRyaWFuZ2xlcyhmYWNlczogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9Xb3JrIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5XHJcbiAgICAgICAgZm9yIChsZXQgZmFjZUluZGV4ID0gdjsgZmFjZUluZGV4IDwgZmFjZXMubGVuZ3RoIC0gMTsgZmFjZUluZGV4KyspIHtcclxuICAgICAgICAgICAgLy9BZGQgb24gdGhlIHRyaWFuZ2xlIHZhcmlhYmxlIHRoZSBpbmRleGVzIHRvIG9idGFpbiB0cmlhbmdsZXNcclxuICAgICAgICAgICAgdGhpcy5fdHJpYW5nbGVzLnB1c2goZmFjZXNbMF0sIGZhY2VzW2ZhY2VJbmRleF0sIGZhY2VzW2ZhY2VJbmRleCArIDFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vUmVzdWx0IG9idGFpbmVkIGFmdGVyIDIgaXRlcmF0aW9uczpcclxuICAgICAgICAvL1BhdHRlcm4xID0+IHRyaWFuZ2xlID0gW1wiMVwiLFwiMlwiLFwiM1wiLFwiMVwiLFwiM1wiLFwiNFwiXTtcclxuICAgICAgICAvL1BhdHRlcm4yID0+IHRyaWFuZ2xlID0gW1wiMS8xXCIsXCIyLzJcIixcIjMvM1wiLFwiMS8xXCIsXCIzLzNcIixcIjQvNFwiXTtcclxuICAgICAgICAvL1BhdHRlcm4zID0+IHRyaWFuZ2xlID0gW1wiMS8xLzFcIixcIjIvMi8yXCIsXCIzLzMvM1wiLFwiMS8xLzFcIixcIjMvMy8zXCIsXCI0LzQvNFwiXTtcclxuICAgICAgICAvL1BhdHRlcm40ID0+IHRyaWFuZ2xlID0gW1wiMS8vMVwiLFwiMi8vMlwiLFwiMy8vM1wiLFwiMS8vMVwiLFwiMy8vM1wiLFwiNC8vNFwiXTtcclxuICAgICAgICAvL1BhdHRlcm41ID0+IHRyaWFuZ2xlID0gW1wiLTEvLTEvLTFcIixcIi0yLy0yLy0yXCIsXCItMy8tMy8tM1wiLFwiLTEvLTEvLTFcIixcIi0zLy0zLy0zXCIsXCItNC8tNC8tNFwiXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgYW5kIHB1c2ggdGhlIGRhdGEgZm9yIGVhY2ggcG9seWdvbiBmb3IgdGhlIHBhdHRlcm4gMVxyXG4gICAgICogSW4gdGhpcyBwYXR0ZXJuIHdlIGdldCB2ZXJ0aWNlIHBvc2l0aW9uc1xyXG4gICAgICogQHBhcmFtIGZhY2VcclxuICAgICAqIEBwYXJhbSB2XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMShmYWNlOiBBcnJheTxzdHJpbmc+LCB2OiBudW1iZXIpIHtcclxuICAgICAgICAvL0dldCB0aGUgaW5kaWNlcyBvZiB0cmlhbmdsZXMgZm9yIGVhY2ggcG9seWdvblxyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuICAgICAgICAvL0ZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIHRyaWFuZ2xlcyBhcnJheS5cclxuICAgICAgICAvL1RoaXMgdmFyIGNvdWxkIGNvbnRhaW5zIDEgdG8gYW4gaW5maW5pdHkgb2YgdHJpYW5nbGVzXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy8gU2V0IHBvc2l0aW9uIGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VQb3NpdGlvbkZyb21PYmogPSBwYXJzZUludCh0aGlzLl90cmlhbmdsZXNba10pIC0gMTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgMCwgLy8gSW4gdGhlIHBhdHRlcm4gMSwgbm9ybWFscyBhbmQgdXZzIGFyZSBub3QgZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zaXRpb25zW2luZGljZVBvc2l0aW9uRnJvbU9ial0sIC8vIEdldCB0aGUgdmVjdG9ycyBkYXRhXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyLlplcm8oKSxcclxuICAgICAgICAgICAgICAgIFZlY3RvcjMuVXAoKSwgLy8gQ3JlYXRlIGRlZmF1bHQgdmVjdG9yc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzID8gdGhpcy5fY29sb3JzW2luZGljZVBvc2l0aW9uRnJvbU9ial0gOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAyXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zIGFuZCB1dnNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjIoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiBhbmQgdXZcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvXCIpOyAvLyBbXCIxXCIsIFwiMVwiXVxyXG4gICAgICAgICAgICAvL1NldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMF0pIC0gMTtcclxuICAgICAgICAgICAgLy9TZXQgdXYgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVV2c0Zyb21PYmogPSBwYXJzZUludChwb2ludFsxXSkgLSAxO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc2V0RGF0YShcclxuICAgICAgICAgICAgICAgIGluZGljZVBvc2l0aW9uRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZVV2c0Zyb21PYmosXHJcbiAgICAgICAgICAgICAgICAwLCAvL0RlZmF1bHQgdmFsdWUgZm9yIG5vcm1hbHNcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvL0dldCB0aGUgdmFsdWVzIGZvciBlYWNoIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V2c1tpbmRpY2VVdnNGcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIFZlY3RvcjMuVXAoKSwgLy9EZWZhdWx0IHZhbHVlIGZvciBub3JtYWxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMgPyB0aGlzLl9jb2xvcnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiAzXHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zLCB1dnMgYW5kIG5vcm1hbHNcclxuICAgICAqIEBwYXJhbSBmYWNlXHJcbiAgICAgKiBAcGFyYW0gdlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjMoZmFjZTogQXJyYXk8c3RyaW5nPiwgdjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9HZXQgdGhlIGluZGljZXMgb2YgdHJpYW5nbGVzIGZvciBlYWNoIHBvbHlnb25cclxuICAgICAgICB0aGlzLl9nZXRUcmlhbmdsZXMoZmFjZSwgdik7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIC8vdHJpYW5nbGVba10gPSBcIjEvMS8xXCJcclxuICAgICAgICAgICAgLy9TcGxpdCB0aGUgZGF0YSBmb3IgZ2V0dGluZyBwb3NpdGlvbiwgdXYsIGFuZCBub3JtYWxzXHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fdHJpYW5nbGVzW2tdLnNwbGl0KFwiL1wiKTsgLy8gW1wiMVwiLCBcIjFcIiwgXCIxXCJdXHJcbiAgICAgICAgICAgIC8vIFNldCBwb3NpdGlvbiBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMF0pIC0gMTtcclxuICAgICAgICAgICAgLy8gU2V0IHV2IGluZGljZVxyXG4gICAgICAgICAgICBjb25zdCBpbmRpY2VVdnNGcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMV0pIC0gMTtcclxuICAgICAgICAgICAgLy8gU2V0IG5vcm1hbCBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlTm9ybWFsRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzJdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlVXZzRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGluZGljZU5vcm1hbEZyb21PYmosXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wb3NpdGlvbnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX3V2c1tpbmRpY2VVdnNGcm9tT2JqXSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHNbaW5kaWNlTm9ybWFsRnJvbU9ial0gLy9TZXQgdGhlIHZlY3RvciBmb3IgZWFjaCBjb21wb25lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9SZXNldCB2YXJpYWJsZSBmb3IgdGhlIG5leHQgbGluZVxyXG4gICAgICAgIHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIHRyaWFuZ2xlcyBhbmQgcHVzaCB0aGUgZGF0YSBmb3IgZWFjaCBwb2x5Z29uIGZvciB0aGUgcGF0dGVybiA0XHJcbiAgICAgKiBJbiB0aGlzIHBhdHRlcm4gd2UgZ2V0IHZlcnRpY2UgcG9zaXRpb25zIGFuZCBub3JtYWxzXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm40KGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2dldFRyaWFuZ2xlcyhmYWNlLCB2KTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLl90cmlhbmdsZXMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgLy90cmlhbmdsZVtrXSA9IFwiMS8vMVwiXHJcbiAgICAgICAgICAgIC8vU3BsaXQgdGhlIGRhdGEgZm9yIGdldHRpbmcgcG9zaXRpb24gYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSB0aGlzLl90cmlhbmdsZXNba10uc3BsaXQoXCIvL1wiKTsgLy8gW1wiMVwiLCBcIjFcIl1cclxuICAgICAgICAgICAgLy8gV2UgY2hlY2sgaW5kaWNlcywgYW5kIG5vcm1hbHNcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlUG9zaXRpb25Gcm9tT2JqID0gcGFyc2VJbnQocG9pbnRbMF0pIC0gMTtcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlTm9ybWFsRnJvbU9iaiA9IHBhcnNlSW50KHBvaW50WzFdKSAtIDE7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9zZXREYXRhKFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlUG9zaXRpb25Gcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgMSwgLy9EZWZhdWx0IHZhbHVlIGZvciB1dlxyXG4gICAgICAgICAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLCAvL0dldCBlYWNoIHZlY3RvciBvZiBkYXRhXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyLlplcm8oKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vcm1hbHNbaW5kaWNlTm9ybWFsRnJvbU9ial0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMgPyB0aGlzLl9jb2xvcnNbaW5kaWNlUG9zaXRpb25Gcm9tT2JqXSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1Jlc2V0IHZhcmlhYmxlIGZvciB0aGUgbmV4dCBsaW5lXHJcbiAgICAgICAgdGhpcy5fdHJpYW5nbGVzLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAqIENyZWF0ZSB0cmlhbmdsZXMgYW5kIHB1c2ggdGhlIGRhdGEgZm9yIGVhY2ggcG9seWdvbiBmb3IgdGhlIHBhdHRlcm4gM1xyXG4gICAgICogSW4gdGhpcyBwYXR0ZXJuIHdlIGdldCB2ZXJ0aWNlIHBvc2l0aW9ucywgdXZzIGFuZCBub3JtYWxzXHJcbiAgICAgKiBAcGFyYW0gZmFjZVxyXG4gICAgICogQHBhcmFtIHZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm41KGZhY2U6IEFycmF5PHN0cmluZz4sIHY6IG51bWJlcikge1xyXG4gICAgICAgIC8vR2V0IHRoZSBpbmRpY2VzIG9mIHRyaWFuZ2xlcyBmb3IgZWFjaCBwb2x5Z29uXHJcbiAgICAgICAgdGhpcy5fZ2V0VHJpYW5nbGVzKGZhY2UsIHYpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHRoaXMuX3RyaWFuZ2xlcy5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICAvL3RyaWFuZ2xlW2tdID0gXCItMS8tMS8tMVwiXHJcbiAgICAgICAgICAgIC8vU3BsaXQgdGhlIGRhdGEgZm9yIGdldHRpbmcgcG9zaXRpb24sIHV2LCBhbmQgbm9ybWFsc1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IHRoaXMuX3RyaWFuZ2xlc1trXS5zcGxpdChcIi9cIik7IC8vIFtcIi0xXCIsIFwiLTFcIiwgXCItMVwiXVxyXG4gICAgICAgICAgICAvLyBTZXQgcG9zaXRpb24gaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZVBvc2l0aW9uRnJvbU9iaiA9IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGggKyBwYXJzZUludChwb2ludFswXSk7XHJcbiAgICAgICAgICAgIC8vIFNldCB1diBpbmRpY2VcclxuICAgICAgICAgICAgY29uc3QgaW5kaWNlVXZzRnJvbU9iaiA9IHRoaXMuX3V2cy5sZW5ndGggKyBwYXJzZUludChwb2ludFsxXSk7XHJcbiAgICAgICAgICAgIC8vIFNldCBub3JtYWwgaW5kaWNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGljZU5vcm1hbEZyb21PYmogPSB0aGlzLl9ub3JtYWxzLmxlbmd0aCArIHBhcnNlSW50KHBvaW50WzJdKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldERhdGEoXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VQb3NpdGlvbkZyb21PYmosXHJcbiAgICAgICAgICAgICAgICBpbmRpY2VVdnNGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNlTm9ybWFsRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdXZzW2luZGljZVV2c0Zyb21PYmpdLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFsc1tpbmRpY2VOb3JtYWxGcm9tT2JqXSwgLy9TZXQgdGhlIHZlY3RvciBmb3IgZWFjaCBjb21wb25lbnRcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRpbmdPcHRpb25zLmltcG9ydFZlcnRleENvbG9ycyA/IHRoaXMuX2NvbG9yc1tpbmRpY2VQb3NpdGlvbkZyb21PYmpdIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vUmVzZXQgdmFyaWFibGUgZm9yIHRoZSBuZXh0IGxpbmVcclxuICAgICAgICB0aGlzLl90cmlhbmdsZXMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9hZGRQcmV2aW91c09iak1lc2goKSB7XHJcbiAgICAgICAgLy9DaGVjayBpZiBpdCBpcyBub3QgdGhlIGZpcnN0IG1lc2guIE90aGVyd2lzZSB3ZSBkb24ndCBoYXZlIGRhdGEuXHJcbiAgICAgICAgaWYgKHRoaXMuX21lc2hlc0Zyb21PYmoubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL0dldCB0aGUgcHJldmlvdXMgbWVzaCBmb3IgYXBwbHlpbmcgdGhlIGRhdGEgYWJvdXQgdGhlIGZhY2VzXHJcbiAgICAgICAgICAgIC8vPT4gaW4gb2JqIGZpbGUsIGZhY2VzIGRlZmluaXRpb24gYXBwZW5kIGFmdGVyIHRoZSBuYW1lIG9mIHRoZSBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoID0gdGhpcy5fbWVzaGVzRnJvbU9ialt0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgaW50byBBcnJheSBmb3IgdGhlIG1lc2hcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmV2ZXJzZSB0YWIuIE90aGVyd2lzZSBmYWNlIGFyZSBkaXNwbGF5ZWQgaW4gdGhlIHdyb25nIHNlbnNcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL1NldCB0aGUgaW5mb3JtYXRpb24gZm9yIHRoZSBtZXNoXHJcbiAgICAgICAgICAgIC8vU2xpY2UgdGhlIGFycmF5IHRvIGF2b2lkIHJld3JpdGluZyBiZWNhdXNlIG9mIHRoZSBmYWN0IHRoaXMgaXMgdGhlIHNhbWUgdmFyIHdoaWNoIGJlIHJld3JpdGVkXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmluZGljZXMgPSB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnMgPSB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLm5vcm1hbHMgPSB0aGlzLl91bndyYXBwZWROb3JtYWxzRm9yQmFieWxvbi5zbGljZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC51dnMgPSB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24uc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmNvbG9ycyA9IHRoaXMuX3Vud3JhcHBlZENvbG9yc0ZvckJhYnlsb24uc2xpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9SZXNldCB0aGUgYXJyYXkgZm9yIHRoZSBuZXh0IG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbi5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9vcHRpbWl6ZU5vcm1hbHMobWVzaDogQWJzdHJhY3RNZXNoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gbWVzaC5nZXRWZXJ0aWNlc0RhdGEoVmVydGV4QnVmZmVyLlBvc2l0aW9uS2luZCk7XHJcbiAgICAgICAgY29uc3Qgbm9ybWFscyA9IG1lc2guZ2V0VmVydGljZXNEYXRhKFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kKTtcclxuICAgICAgICBjb25zdCBtYXBWZXJ0aWNlczogeyBba2V5OiBzdHJpbmddOiBudW1iZXJbXSB9ID0ge307XHJcblxyXG4gICAgICAgIGlmICghcG9zaXRpb25zIHx8ICFub3JtYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zLmxlbmd0aCAvIDM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB4ID0gcG9zaXRpb25zW2kgKiAzICsgMF07XHJcbiAgICAgICAgICAgIGNvbnN0IHkgPSBwb3NpdGlvbnNbaSAqIDMgKyAxXTtcclxuICAgICAgICAgICAgY29uc3QgeiA9IHBvc2l0aW9uc1tpICogMyArIDJdO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSB4ICsgXCJfXCIgKyB5ICsgXCJfXCIgKyB6O1xyXG5cclxuICAgICAgICAgICAgbGV0IGxzdCA9IG1hcFZlcnRpY2VzW2tleV07XHJcbiAgICAgICAgICAgIGlmICghbHN0KSB7XHJcbiAgICAgICAgICAgICAgICBsc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIG1hcFZlcnRpY2VzW2tleV0gPSBsc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbHN0LnB1c2goaSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub3JtYWwgPSBuZXcgVmVjdG9yMygpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG1hcFZlcnRpY2VzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxzdCA9IG1hcFZlcnRpY2VzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChsc3QubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHYwSWR4ID0gbHN0WzBdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdklkeCA9IGxzdFtpXTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdjBJZHggKiAzICsgMF0gKz0gbm9ybWFsc1t2SWR4ICogMyArIDBdO1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2MElkeCAqIDMgKyAxXSArPSBub3JtYWxzW3ZJZHggKiAzICsgMV07XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3YwSWR4ICogMyArIDJdICs9IG5vcm1hbHNbdklkeCAqIDMgKyAyXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbm9ybWFsLmNvcHlGcm9tRmxvYXRzKG5vcm1hbHNbdjBJZHggKiAzICsgMF0sIG5vcm1hbHNbdjBJZHggKiAzICsgMV0sIG5vcm1hbHNbdjBJZHggKiAzICsgMl0pO1xyXG4gICAgICAgICAgICBub3JtYWwubm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxzdC5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdklkeCA9IGxzdFtpXTtcclxuICAgICAgICAgICAgICAgIG5vcm1hbHNbdklkeCAqIDMgKyAwXSA9IG5vcm1hbC54O1xyXG4gICAgICAgICAgICAgICAgbm9ybWFsc1t2SWR4ICogMyArIDFdID0gbm9ybWFsLnk7XHJcbiAgICAgICAgICAgICAgICBub3JtYWxzW3ZJZHggKiAzICsgMl0gPSBub3JtYWwuejtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBtZXNoLnNldFZlcnRpY2VzRGF0YShWZXJ0ZXhCdWZmZXIuTm9ybWFsS2luZCwgbm9ybWFscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIHBhcnNlIGFuIE9CSiBzdHJpbmdcclxuICAgICAqIEBwYXJhbSBtZXNoZXNOYW1lcyBkZWZpbmVzIHRoZSBsaXN0IG9mIG1lc2hlcyB0byBsb2FkIChhbGwgaWYgbm90IGRlZmluZWQpXHJcbiAgICAgKiBAcGFyYW0gZGF0YSBkZWZpbmVzIHRoZSBPQkogc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gc2NlbmUgZGVmaW5lcyB0aGUgaG9zdGluZyBzY2VuZVxyXG4gICAgICogQHBhcmFtIGFzc2V0Q29udGFpbmVyIGRlZmluZXMgdGhlIGFzc2V0IGNvbnRhaW5lciB0byBsb2FkIGRhdGEgaW5cclxuICAgICAqIEBwYXJhbSBvbkZpbGVUb0xvYWRGb3VuZCBkZWZpbmVzIGEgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCBpZiBhIE1UTCBmaWxlIGlzIGZvdW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXJzZShtZXNoZXNOYW1lczogYW55LCBkYXRhOiBzdHJpbmcsIHNjZW5lOiBTY2VuZSwgYXNzZXRDb250YWluZXI6IE51bGxhYmxlPEFzc2V0Q29udGFpbmVyPiwgb25GaWxlVG9Mb2FkRm91bmQ6IChmaWxlVG9Mb2FkOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICAvLyBTcGxpdCB0aGUgZmlsZSBpbnRvIGxpbmVzXHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KFwiXFxuXCIpO1xyXG4gICAgICAgIC8vIExvb2sgYXQgZWFjaCBsaW5lXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbaV0udHJpbSgpLnJlcGxhY2UoL1xcc1xccy9nLCBcIiBcIik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAvLyBDb21tZW50IG9yIG5ld0xpbmVcclxuICAgICAgICAgICAgaWYgKGxpbmUubGVuZ3RoID09PSAwIHx8IGxpbmUuY2hhckF0KDApID09PSBcIiNcIikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9HZXQgaW5mb3JtYXRpb24gYWJvdXQgb25lIHBvc2l0aW9uIHBvc3NpYmxlIGZvciB0aGUgdmVydGljZXNcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5WZXJ0ZXhQYXR0ZXJuLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGxpbmUubWF0Y2goL1teIF0rL2cpITsgLy8gbWF0Y2ggd2lsbCByZXR1cm4gbm9uLW51bGwgZHVlIHRvIHBhc3NpbmcgcmVnZXggcGF0dGVyblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZhbHVlIG9mIHJlc3VsdCB3aXRoIGxpbmU6IFwidiAxLjAgMi4wIDMuMFwiXHJcbiAgICAgICAgICAgICAgICAvLyBbXCJ2XCIsIFwiMS4wXCIsIFwiMi4wXCIsIFwiMy4wXCJdXHJcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBWZWN0b3IzIHdpdGggdGhlIHBvc2l0aW9uIHgsIHksIHpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9ucy5wdXNoKG5ldyBWZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbMl0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPj0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByID0gcGFyc2VGbG9hdChyZXN1bHRbNF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBnID0gcGFyc2VGbG9hdChyZXN1bHRbNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gcGFyc2VGbG9hdChyZXN1bHRbNl0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29sb3JzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgQ29sb3I0KHIgPiAxID8gciAvIDI1NSA6IHIsIGcgPiAxID8gZyAvIDI1NSA6IGcsIGIgPiAxID8gYiAvIDI1NSA6IGIsIHJlc3VsdC5sZW5ndGggPT09IDcgfHwgcmVzdWx0WzddID09PSB1bmRlZmluZWQgPyAxIDogcGFyc2VGbG9hdChyZXN1bHRbN10pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1heWJlIHB1c2ggTlVMTCBhbmQgaWYgYWxsIGFyZSBOVUxMIHRvIHNraXAgKGFuZCByZW1vdmUgZ3JheUNvbG9yIHZhcikuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9ycy5wdXNoKHRoaXMuX2dyYXlDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5Ob3JtYWxQYXR0ZXJuLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIFZlY3RvcjMgd2l0aCB0aGUgbm9ybWFscyB4LCB5LCB6XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy8gW1widm4gMS4wIDIuMCAzLjBcIiwgXCIxLjBcIiwgXCIyLjBcIiwgXCIzLjBcIl1cclxuICAgICAgICAgICAgICAgIC8vQWRkIHRoZSBWZWN0b3IgaW4gdGhlIGxpc3Qgb2Ygbm9ybWFsc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9ybWFscy5wdXNoKG5ldyBWZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbMl0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSkpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuVVZQYXR0ZXJuLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL0NyZWF0ZSBhIFZlY3RvcjIgd2l0aCB0aGUgbm9ybWFscyB1LCB2XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy8gW1widnQgMC4xIDAuMiAwLjNcIiwgXCIwLjFcIiwgXCIwLjJcIl1cclxuICAgICAgICAgICAgICAgIC8vQWRkIHRoZSBWZWN0b3IgaW4gdGhlIGxpc3Qgb2YgdXZzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91dnMucHVzaChuZXcgVmVjdG9yMihwYXJzZUZsb2F0KHJlc3VsdFsxXSkgKiB0aGlzLl9sb2FkaW5nT3B0aW9ucy5VVlNjYWxpbmcueCwgcGFyc2VGbG9hdChyZXN1bHRbMl0pICogdGhpcy5fbG9hZGluZ09wdGlvbnMuVVZTY2FsaW5nLnkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0lkZW50aWZ5IHBhdHRlcm5zIG9mIGZhY2VzXHJcbiAgICAgICAgICAgICAgICAvL0ZhY2UgY291bGQgYmUgZGVmaW5lZCBpbiBkaWZmZXJlbnQgdHlwZSBvZiBwYXR0ZXJuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuMy5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgMS8xLzEgMi8yLzIgMy8zLzNcIiwgXCIxLzEvMSAyLzIvMiAzLzMvM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMyhcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8xLzFcIiwgXCIyLzIvMlwiLCBcIjMvMy8zXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm40LmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdDpcclxuICAgICAgICAgICAgICAgIC8vW1wiZiAxLy8xIDIvLzIgMy8vM1wiLCBcIjEvLzEgMi8vMiAzLy8zXCIuLi5dXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm40KFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxLy8xXCIsIFwiMi8vMlwiLCBcIjMvLzNcIl1cclxuICAgICAgICAgICAgICAgICAgICAxXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5GYWNlUGF0dGVybjUuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0OlxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIC0xLy0xLy0xIC0yLy0yLy0yIC0zLy0zLy0zXCIsIFwiLTEvLTEvLTEgLTIvLTIvLTIgLTMvLTMvLTNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjUoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIi0xLy0xLy0xXCIsIFwiLTIvLTIvLTJcIiwgXCItMy8tMy8tM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkZhY2VQYXR0ZXJuMi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHQ6XHJcbiAgICAgICAgICAgICAgICAvL1tcImYgMS8xIDIvMiAzLzNcIiwgXCIxLzEgMi8yIDMvM1wiLi4uXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMihcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8xXCIsIFwiMi8yXCIsIFwiMy8zXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gU29saWRQYXJzZXIuRmFjZVBhdHRlcm4xLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL1ZhbHVlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAgICAgLy9bXCJmIDEgMiAzXCIsIFwiMSAyIDNcIi4uLl1cclxuXHJcbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgZGF0YSBmb3IgdGhpcyBmYWNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXREYXRhRm9yQ3VycmVudEZhY2VXaXRoUGF0dGVybjEoXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0WzFdLnRyaW0oKS5zcGxpdChcIiBcIiksIC8vIFtcIjFcIiwgXCIyXCIsIFwiM1wiXVxyXG4gICAgICAgICAgICAgICAgICAgIDFcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGEgbWVzaCBvciBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIEVhY2ggdGltZSB0aGlzIGtleXdvcmQgaXMgYW5hbHl6ZWQsIGNyZWF0ZSBhIG5ldyBPYmplY3Qgd2l0aCBhbGwgZGF0YSBmb3IgY3JlYXRpbmcgYSBiYWJ5bG9uTWVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5MaW5lUGF0dGVybjEuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvL1tcImwgMSAyXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoaXMgZmFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0RGF0YUZvckN1cnJlbnRGYWNlV2l0aFBhdHRlcm4xKFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFsxXS50cmltKCkuc3BsaXQoXCIgXCIpLCAvLyBbXCIxXCIsIFwiMlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGEgbWVzaCBvciBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIEVhY2ggdGltZSB0aGlzIGtleXdvcmQgaXMgYW5hbHl6ZWQsIGNyZWF0ZSBhIG5ldyBPYmplY3Qgd2l0aCBhbGwgZGF0YSBmb3IgY3JlYXRpbmcgYSBiYWJ5bG9uTWVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBTb2xpZFBhcnNlci5MaW5lUGF0dGVybjIuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vVmFsdWUgb2YgcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAvL1tcImwgMS8xIDIvMlwiXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMihcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8xXCIsIFwiMi8yXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgMFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgYSBtZXNoIG9yIGFuIG9iamVjdFxyXG4gICAgICAgICAgICAgICAgLy8gRWFjaCB0aW1lIHRoaXMga2V5d29yZCBpcyBhbmFseXplZCwgY3JlYXRlIGEgbmV3IE9iamVjdCB3aXRoIGFsbCBkYXRhIGZvciBjcmVhdGluZyBhIGJhYnlsb25NZXNoXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IFNvbGlkUGFyc2VyLkxpbmVQYXR0ZXJuMy5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9WYWx1ZSBvZiByZXN1bHRcclxuICAgICAgICAgICAgICAgIC8vW1wibCAxLzEvMSAyLzIvMlwiXVxyXG5cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGlzIGZhY2VcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldERhdGFGb3JDdXJyZW50RmFjZVdpdGhQYXR0ZXJuMyhcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbMV0udHJpbSgpLnNwbGl0KFwiIFwiKSwgLy8gW1wiMS8xLzFcIiwgXCIyLzIvMlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIDBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGEgbWVzaCBvciBhbiBvYmplY3RcclxuICAgICAgICAgICAgICAgIC8vIEVhY2ggdGltZSB0aGlzIGtleXdvcmQgaXMgYW5hbHl6ZWQsIGNyZWF0ZSBhIG5ldyBPYmplY3Qgd2l0aCBhbGwgZGF0YSBmb3IgY3JlYXRpbmcgYSBiYWJ5bG9uTWVzaFxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLkdyb3VwRGVzY3JpcHRvci50ZXN0KGxpbmUpIHx8IFNvbGlkUGFyc2VyLk9iamVjdERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IG1lc2ggY29ycmVzcG9uZGluZyB0byB0aGUgbmFtZSBvZiB0aGUgZ3JvdXAuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWZpbml0aW9uIG9mIHRoZSBtZXNoXHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmpNZXNoOiBNZXNoT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGxpbmUuc3Vic3RyaW5nKDIpLnRyaW0oKSwgLy9TZXQgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgb2JqIG1lc2hcclxuICAgICAgICAgICAgICAgICAgICBpbmRpY2VzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHV2czogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGVyaWFsTmFtZTogdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaixcclxuICAgICAgICAgICAgICAgICAgICBpc09iamVjdDogU29saWRQYXJzZXIuT2JqZWN0RGVzY3JpcHRvci50ZXN0KGxpbmUpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFByZXZpb3VzT2JqTWVzaCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vUHVzaCB0aGUgbGFzdCBtZXNoIGNyZWF0ZWQgd2l0aCBvbmx5IHRoZSBuYW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2gob2JqTWVzaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9TZXQgdGhpcyB2YXJpYWJsZSB0byBpbmRpY2F0ZSB0aGF0IG5vdyBtZXNoZXNGcm9tT2JqIGhhcyBvYmplY3RzIGRlZmluZWQgaW5zaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNNZXNoZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNGaXJzdE1hdGVyaWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudCA9IDE7XHJcbiAgICAgICAgICAgICAgICAvL0tleXdvcmQgZm9yIGFwcGx5aW5nIGEgbWF0ZXJpYWxcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5Vc2VNdGxEZXNjcmlwdG9yLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vR2V0IHRoZSBuYW1lIG9mIHRoZSBtYXRlcmlhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaiA9IGxpbmUuc3Vic3RyaW5nKDcpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoaXMgbmV3IG1hdGVyaWFsIGlzIGluIHRoZSBzYW1lIG1lc2hcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzRmlyc3RNYXRlcmlhbCB8fCAhdGhpcy5faGFzTWVzaGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZm9yIHRoZSBwcmV2aW91cyBtZXNoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkUHJldmlvdXNPYmpNZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9DcmVhdGUgYSBuZXcgbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iak1lc2g6IE1lc2hPYmplY3QgPVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAodGhpcy5fb2JqTWVzaE5hbWUgfHwgXCJtZXNoXCIpICsgXCJfbW1cIiArIHRoaXMuX2luY3JlbWVudC50b1N0cmluZygpLCAvL1NldCB0aGUgbmFtZSBvZiB0aGUgY3VycmVudCBvYmogbWVzaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kaWNlczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxzOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dnM6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yczogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0ZXJpYWxOYW1lOiB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNPYmplY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luY3JlbWVudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSWYgbWVzaGVzIGFyZSBhbHJlYWR5IGRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2gob2JqTWVzaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFzTWVzaGVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIGlmIHRoZSBwcmV2aW91cyBsaW5lIGRlZmluZSBhIG1lc2hcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzTWVzaGVzICYmIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IHRoZSBtYXRlcmlhbCBuYW1lIHRvIHRoZSBwcmV2aW91cyBtZXNoICgxIG1hdGVyaWFsIHBlciBtZXNoKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lc2hlc0Zyb21PYmpbdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGggLSAxXS5tYXRlcmlhbE5hbWUgPSB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RNYXRlcmlhbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gS2V5d29yZCBmb3IgbG9hZGluZyB0aGUgbXRsIGZpbGVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChTb2xpZFBhcnNlci5NdGxMaWJHcm91cERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBuYW1lIG9mIG10bCBmaWxlXHJcbiAgICAgICAgICAgICAgICBvbkZpbGVUb0xvYWRGb3VuZChsaW5lLnN1YnN0cmluZyg3KS50cmltKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHNtb290aGluZ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKFNvbGlkUGFyc2VyLlNtb290aERlc2NyaXB0b3IudGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc21vb3RoIHNoYWRpbmcgPT4gYXBwbHkgc21vb3RoaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBUb2RheSBJIGRvbid0IGtub3cgaXQgd29yayB3aXRoIGJhYnlsb24gYW5kIHdpdGggb2JqLlxyXG4gICAgICAgICAgICAgICAgLy8gV2l0aCB0aGUgb2JqIGZpbGUgIGFuIGludGVnZXIgaXMgc2V0XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHRoZXJlIGlzIGFub3RoZXIgcG9zc2liaWxpdHlcclxuICAgICAgICAgICAgICAgIExvZ2dlci5Mb2coXCJVbmhhbmRsZWQgZXhwcmVzc2lvbiBhdCBsaW5lIDogXCIgKyBsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXQgdGhlIGVuZCBvZiB0aGUgZmlsZSwgYWRkIHRoZSBsYXN0IG1lc2ggaW50byB0aGUgbWVzaGVzRnJvbU9iaiBhcnJheVxyXG4gICAgICAgIGlmICh0aGlzLl9oYXNNZXNoZXMpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBkYXRhIGZvciB0aGUgbGFzdCBtZXNoXHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoID0gdGhpcy5fbWVzaGVzRnJvbU9ialt0aGlzLl9tZXNoZXNGcm9tT2JqLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAgICAgLy9SZXZlcnNlIGluZGljZXMgZm9yIGRpc3BsYXlpbmcgZmFjZXMgaW4gdGhlIGdvb2Qgc2Vuc2VcclxuICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAvL0dldCB0aGUgZ29vZCBhcnJheVxyXG4gICAgICAgICAgICB0aGlzLl91bndyYXBEYXRhKCk7XHJcbiAgICAgICAgICAgIC8vU2V0IGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZWRNZXNoLmluZGljZXMgPSB0aGlzLl9pbmRpY2VzRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zID0gdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbjtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2gubm9ybWFscyA9IHRoaXMuX3Vud3JhcHBlZE5vcm1hbHNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC51dnMgPSB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb247XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9hZGluZ09wdGlvbnMuaW1wb3J0VmVydGV4Q29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVkTWVzaC5jb2xvcnMgPSB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBhbnkgbyBvciBnIGtleXdvcmQgbm90IGZvdW5kLCBjcmVhdGUgYSBtZXNoIHdpdGggYSByYW5kb20gaWRcclxuICAgICAgICBpZiAoIXRoaXMuX2hhc01lc2hlcykge1xyXG4gICAgICAgICAgICBsZXQgbmV3TWF0ZXJpYWw6IE51bGxhYmxlPFN0YW5kYXJkTWF0ZXJpYWw+ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmV2ZXJzZSB0YWIgb2YgaW5kaWNlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlc0ZvckJhYnlsb24ucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgLy9HZXQgcG9zaXRpb25zIG5vcm1hbHMgdXZzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaGVyZSBpcyBubyBpbmRpY2VzIGluIHRoZSBmaWxlLiBXZSB3aWxsIGhhdmUgdG8gc3dpdGNoIHRvIHBvaW50IGNsb3VkIHJlbmRlcmluZ1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBwb3Mgb2YgdGhpcy5fcG9zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkUG9zaXRpb25zRm9yQmFieWxvbi5wdXNoKHBvcy54LCBwb3MueSwgcG9zLnopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9ub3JtYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgbm9ybWFsIG9mIHRoaXMuX25vcm1hbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24ucHVzaChub3JtYWwueCwgbm9ybWFsLnksIG5vcm1hbC56KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3V2cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHV2IG9mIHRoaXMuX3V2cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRVVkZvckJhYnlsb24ucHVzaCh1di54LCB1di55KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNvbG9yIG9mIHRoaXMuX2NvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLnB1c2goY29sb3IuciwgY29sb3IuZywgY29sb3IuYiwgY29sb3IuYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG1hdGVyaWFsIHdpdGggcG9pbnQgY2xvdWQgb25cclxuICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbCA9IG5ldyBTdGFuZGFyZE1hdGVyaWFsKEdlb21ldHJ5LlJhbmRvbUlkKCksIHNjZW5lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3TWF0ZXJpYWwucG9pbnRzQ2xvdWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbE5hbWVGcm9tT2JqID0gbmV3TWF0ZXJpYWwubmFtZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9ub3JtYWxzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5kaXNhYmxlTGlnaHRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNYXRlcmlhbC5lbWlzc2l2ZUNvbG9yID0gQ29sb3IzLldoaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1NldCBkYXRhIGZvciBvbmUgbWVzaFxyXG4gICAgICAgICAgICB0aGlzLl9tZXNoZXNGcm9tT2JqLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogR2VvbWV0cnkuUmFuZG9tSWQoKSxcclxuICAgICAgICAgICAgICAgIGluZGljZXM6IHRoaXMuX2luZGljZXNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb25zOiB0aGlzLl91bndyYXBwZWRQb3NpdGlvbnNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiB0aGlzLl91bndyYXBwZWRDb2xvcnNGb3JCYWJ5bG9uLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsczogdGhpcy5fdW53cmFwcGVkTm9ybWFsc0ZvckJhYnlsb24sXHJcbiAgICAgICAgICAgICAgICB1dnM6IHRoaXMuX3Vud3JhcHBlZFVWRm9yQmFieWxvbixcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsTmFtZTogdGhpcy5fbWF0ZXJpYWxOYW1lRnJvbU9iaixcclxuICAgICAgICAgICAgICAgIGRpcmVjdE1hdGVyaWFsOiBuZXdNYXRlcmlhbCxcclxuICAgICAgICAgICAgICAgIGlzT2JqZWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vU2V0IGRhdGEgZm9yIGVhY2ggbWVzaFxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5fbWVzaGVzRnJvbU9iai5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAvL2NoZWNrIG1lc2hlc05hbWVzIChzdGxGaWxlTG9hZGVyKVxyXG4gICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgJiYgdGhpcy5fbWVzaGVzRnJvbU9ialtqXS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobWVzaGVzTmFtZXMgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNoZXNOYW1lcy5pbmRleE9mKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSAhPT0gbWVzaGVzTmFtZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0dldCB0aGUgY3VycmVudCBtZXNoXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIHdpdGggVmVydGV4QnVmZmVyIGZvciBlYWNoIG1lc2hcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2ggPSB0aGlzLl9tZXNoZXNGcm9tT2JqW2pdO1xyXG4gICAgICAgICAgICAvL0NyZWF0ZSBhIE1lc2ggd2l0aCB0aGUgbmFtZSBvZiB0aGUgb2JqIG1lc2hcclxuXHJcbiAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSAhIWFzc2V0Q29udGFpbmVyO1xyXG4gICAgICAgICAgICBjb25zdCBiYWJ5bG9uTWVzaCA9IG5ldyBNZXNoKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubmFtZSwgc2NlbmUpO1xyXG4gICAgICAgICAgICBiYWJ5bG9uTWVzaC5fcGFyZW50Q29udGFpbmVyID0gYXNzZXRDb250YWluZXI7XHJcbiAgICAgICAgICAgIHNjZW5lLl9ibG9ja0VudGl0eUNvbGxlY3Rpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5faGFuZGxlZE1lc2guX2JhYnlsb25NZXNoID0gYmFieWxvbk1lc2g7XHJcbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSBncm91cCBtZXNoLCBpdCBzaG91bGQgaGF2ZSBhbiBvYmplY3QgbWVzaCBhcyBhIHBhcmVudC4gU28gbG9vayBmb3IgdGhlIGZpcnN0IG9iamVjdCBtZXNoIHRoYXQgYXBwZWFycyBiZWZvcmUgaXQuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faGFuZGxlZE1lc2guaXNPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSBqIC0gMTsgayA+PSAwOyAtLWspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWVzaGVzRnJvbU9ialtrXS5pc09iamVjdCAmJiB0aGlzLl9tZXNoZXNGcm9tT2JqW2tdLl9iYWJ5bG9uTWVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5wYXJlbnQgPSB0aGlzLl9tZXNoZXNGcm9tT2JqW2tdLl9iYWJ5bG9uTWVzaCE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBuYW1lIG9mIHRoZSBtYXRlcmlhbCB0byBhbiBhcnJheVxyXG4gICAgICAgICAgICAvL1RoaXMgaXMgaW5kaXNwZW5zYWJsZSBmb3IgdGhlIGltcG9ydE1lc2ggZnVuY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWxUb1VzZS5wdXNoKHRoaXMuX21lc2hlc0Zyb21PYmpbal0ubWF0ZXJpYWxOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYW5kbGVkTWVzaC5wb3NpdGlvbnM/Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9QdXNoIHRoZSBtZXNoIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JhYnlsb25NZXNoZXNBcnJheS5wdXNoKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2ZXJ0ZXhEYXRhOiBWZXJ0ZXhEYXRhID0gbmV3IFZlcnRleERhdGEoKTsgLy9UaGUgY29udGFpbmVyIGZvciB0aGUgdmFsdWVzXHJcbiAgICAgICAgICAgIC8vU2V0IHRoZSBkYXRhIGZvciB0aGUgYmFieWxvbk1lc2hcclxuICAgICAgICAgICAgdmVydGV4RGF0YS51dnMgPSB0aGlzLl9oYW5kbGVkTWVzaC51dnMgYXMgRmxvYXRBcnJheTtcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5pbmRpY2VzID0gdGhpcy5faGFuZGxlZE1lc2guaW5kaWNlcyBhcyBJbmRpY2VzQXJyYXk7XHJcbiAgICAgICAgICAgIHZlcnRleERhdGEucG9zaXRpb25zID0gdGhpcy5faGFuZGxlZE1lc2gucG9zaXRpb25zIGFzIEZsb2F0QXJyYXk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5jb21wdXRlTm9ybWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsczogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+KCk7XHJcbiAgICAgICAgICAgICAgICBWZXJ0ZXhEYXRhLkNvbXB1dGVOb3JtYWxzKHRoaXMuX2hhbmRsZWRNZXNoLnBvc2l0aW9ucywgdGhpcy5faGFuZGxlZE1lc2guaW5kaWNlcywgbm9ybWFscyk7XHJcbiAgICAgICAgICAgICAgICB2ZXJ0ZXhEYXRhLm5vcm1hbHMgPSBub3JtYWxzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmVydGV4RGF0YS5ub3JtYWxzID0gdGhpcy5faGFuZGxlZE1lc2gubm9ybWFscyBhcyBGbG9hdEFycmF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbXBvcnRWZXJ0ZXhDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgIHZlcnRleERhdGEuY29sb3JzID0gdGhpcy5faGFuZGxlZE1lc2guY29sb3JzIGFzIEZsb2F0QXJyYXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9TZXQgdGhlIGRhdGEgZnJvbSB0aGUgVmVydGV4QnVmZmVyIHRvIHRoZSBjdXJyZW50IE1lc2hcclxuICAgICAgICAgICAgdmVydGV4RGF0YS5hcHBseVRvTWVzaChiYWJ5bG9uTWVzaCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9sb2FkaW5nT3B0aW9ucy5pbnZlcnRZKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5zY2FsaW5nLnkgKj0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvYWRpbmdPcHRpb25zLm9wdGltaXplTm9ybWFscykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3B0aW1pemVOb3JtYWxzKGJhYnlsb25NZXNoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9QdXNoIHRoZSBtZXNoIGludG8gYW4gYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5fYmFieWxvbk1lc2hlc0FycmF5LnB1c2goYmFieWxvbk1lc2gpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2hhbmRsZWRNZXNoLmRpcmVjdE1hdGVyaWFsKSB7XHJcbiAgICAgICAgICAgICAgICBiYWJ5bG9uTWVzaC5tYXRlcmlhbCA9IHRoaXMuX2hhbmRsZWRNZXNoLmRpcmVjdE1hdGVyaWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1pbnRlcm5hbC1tb2R1bGVzICovXHJcbmltcG9ydCAqIGFzIExvYWRlcnMgZnJvbSBcImxvYWRlcnMvT0JKL2luZGV4XCI7XHJcblxyXG4vKipcclxuICogVGhpcyBpcyB0aGUgZW50cnkgcG9pbnQgZm9yIHRoZSBVTUQgbW9kdWxlLlxyXG4gKiBUaGUgZW50cnkgcG9pbnQgZm9yIGEgZnV0dXJlIEVTTSBwYWNrYWdlIHNob3VsZCBiZSBpbmRleC50c1xyXG4gKi9cclxuY29uc3QgZ2xvYmFsT2JqZWN0ID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB1bmRlZmluZWQ7XHJcbmlmICh0eXBlb2YgZ2xvYmFsT2JqZWN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBMb2FkZXJzKSB7XHJcbiAgICAgICAgaWYgKCEoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSkge1xyXG4gICAgICAgICAgICAoPGFueT5nbG9iYWxPYmplY3QpLkJBQllMT05ba2V5XSA9ICg8YW55PkxvYWRlcnMpW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgKiBmcm9tIFwibG9hZGVycy9PQkovaW5kZXhcIjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NaXNjX29ic2VydmFibGVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgKiBhcyBsb2FkZXJzIGZyb20gXCJAbHRzL2xvYWRlcnMvbGVnYWN5L2xlZ2FjeS1vYmpGaWxlTG9hZGVyXCI7XHJcbmV4cG9ydCB7IGxvYWRlcnMgfTtcclxuZXhwb3J0IGRlZmF1bHQgbG9hZGVycztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9