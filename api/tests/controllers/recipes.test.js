const app = require("../../app");
const Recipe = require("../../models/recipe");
const User = require("../../models/user");
const request = require("supertest");
const JWT = require("jsonwebtoken");
const mongoose = require("mongoose")
require("../mongodb_helper");

const secret = process.env.JWT_SECRET;
let recipe;

const createToken = (userId) => {
  return JWT.sign(
    {
      user_id: userId,
      // Backdate this token of 5 minutes
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      // Set the JWT token to expire in 10 minutes
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
  );
};

let token;
let decodedToken;
describe("/recipes", () => {
  beforeAll(async () => {
    // add user
    const user = new User({
      email: "post-test@test.com",
      password: "12345678",
      username: "post-someone",
    });
    await user.save();
    await Recipe.deleteMany({});
    userid = user.id;
    token = createToken(user.id);
    decodedToken = JWT.decode(token, process.env.JWT_SECRET);
    // add recipe
    const currentDate = new Date();
    await request(app)
      .post("/recipes")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test_recipe",
        description: "test_description",
        ownerId: token.user_id,
        tags: ["test_tag_one", "test_tag_two"],
        favouritedByOwner: false,
        totalTime: 20,
        recipeYield: 1,
        recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
        recipeInstructions: ["test_instruction_one", "test_instruction_two"],
        url: "test_url",
        image: "test_url",
        dateAdded: currentDate,
      });

    recipe = await Recipe.find();
  });
  afterEach(async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
  });

  describe("POST, when a valid token is present and recipe input is valid", () => {
    test("new recipe is present in the document", async () => {
      expect(recipe.length).toEqual(1);
      expect(recipe[0].name).toEqual("test_recipe");

      const currentDate = new Date();
      const updateResponse = await request(app)
        .patch(`/recipes/${recipe[0]._id.toString()}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "test_update",
          description: "test_description",
          ownerId: token.user_id,
          tags: ["test_tag_one", "test_tag_two"],
          favouritedByOwner: false,
          totalTime: 20,
          recipeYield: 1,
          recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
          recipeInstructions: ["test_instruction_one", "test_instruction_two"],
          url: "test_url",
          image: "test_url",
          dateAdded: currentDate,
        });
      expect(updateResponse.status).toEqual(200);
      const updateRecipe = await Recipe.find();
      expect(updateRecipe.length).toEqual(1);
      expect(updateRecipe[0].name).toEqual("test_update");
    });
  });
});

describe("/recipes/:recipe_id", () => {
  const dateAdded = new Date("2024-03-04");
  const user = new User({
    username: "pops123",
    email: "poppy@email.com",
    password: "Password1!",
  });
  const recipe = new Recipe({
    name: "Easy blueberry muffins",
    description:
      "Follow this easy blueberry muffins recipe for a fun weekend bake. You're just a few simple steps away from bite-sized blueberry treats",
    ownerId: "65e1ed2534ba17d5e7b48f68",
    tags: ["Baking", "Blueberry"],
    favouritedByOwner: false,
    totalTime: 40,
    recipeYield: 4,
    recipeIngredient: [
      "100g unsalted butter softened, plus 1 tbsp, melted, for greasing",
      "140g golden caster sugar",
      "2 large eggs",
      "140g natural yogurt",
      "1 tsp vanilla extract",
      "2 tbsp milk",
      "250g plain flour",
      "2 tsp baking powder",
      "1 tsp bicarbonate of soda",
      "125g pack blueberries (or use frozen)",
    ],
    recipeInstructions: [
      "Heat oven to 200C/180C fan/gas 6 and line a 12-hole muffin tin with paper cases. Beat the butter and caster sugar together until pale and fluffy. Add the eggs and beat in for 1 min, then mix in the yogurt, vanilla extract and milk. Combine the flour, baking powder and bicarb in a bowl with ¼ tsp fine salt, then tip this into the wet ingredients and stir in. Finally, fold in the blueberries and divide the mixture between the muffin cases.",
      "Bake for 5 mins, then reduce oven to 180C/160C fan/gas 4 and bake for 15-18 mins more until risen and golden, and a cocktail stick inserted into the centre comes out clean.",
      "Cool in the tin for 10 mins, then carefully lift out onto a wire rack to finish cooling. Will keep for 3-4 days in an airtight container – after a day or two, pop them in the microwave for 10-15 secs on high to freshen up.",
    ],
    url: "https://www.bbcgoodfood.com/recipes/blueberry-muffin",
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/blueberry-muffin-ee95fd4.jpg?resize=768,574",
    dateAdded: dateAdded,
  });

  beforeAll(async () => {
    await user.save();
    await recipe.save();
    token = createToken(user.id);
    // console.log("token ----------------------", token);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Recipe.deleteMany({});
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns recipe data for that id", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      const recipeData = response.body.recipeData;

      expect(recipeData.name).toEqual("Easy blueberry muffins");
      expect(recipeData.description).toEqual(
        "Follow this easy blueberry muffins recipe for a fun weekend bake. You're just a few simple steps away from bite-sized blueberry treats"
      );
      expect(recipeData.ownerId).toEqual("65e1ed2534ba17d5e7b48f68");
      expect(recipeData.tags).toEqual(["Baking", "Blueberry"]);
      expect(recipeData.favouritedByOwner).toEqual(false);
      expect(recipeData.totalTime).toEqual(40);
      expect(recipeData.recipeYield).toEqual(4);
      expect(recipeData.recipeIngredient).toEqual([
        "100g unsalted butter softened, plus 1 tbsp, melted, for greasing",
        "140g golden caster sugar",
        "2 large eggs",
        "140g natural yogurt",
        "1 tsp vanilla extract",
        "2 tbsp milk",
        "250g plain flour",
        "2 tsp baking powder",
        "1 tsp bicarbonate of soda",
        "125g pack blueberries (or use frozen)",
      ]);
      expect(recipeData.recipeInstructions).toEqual([
        "Heat oven to 200C/180C fan/gas 6 and line a 12-hole muffin tin with paper cases. Beat the butter and caster sugar together until pale and fluffy. Add the eggs and beat in for 1 min, then mix in the yogurt, vanilla extract and milk. Combine the flour, baking powder and bicarb in a bowl with ¼ tsp fine salt, then tip this into the wet ingredients and stir in. Finally, fold in the blueberries and divide the mixture between the muffin cases.",
        "Bake for 5 mins, then reduce oven to 180C/160C fan/gas 4 and bake for 15-18 mins more until risen and golden, and a cocktail stick inserted into the centre comes out clean.",
        "Cool in the tin for 10 mins, then carefully lift out onto a wire rack to finish cooling. Will keep for 3-4 days in an airtight container – after a day or two, pop them in the microwave for 10-15 secs on high to freshen up.",
      ]);
      expect(recipeData.url).toEqual(
        "https://www.bbcgoodfood.com/recipes/blueberry-muffin"
      );
      expect(recipeData.image).toEqual(
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/blueberry-muffin-ee95fd4.jpg?resize=768,574"
      );
      expect(recipeData.dateAdded).toEqual("2024-03-04T00:00:00.000Z");
    });

    test("returns a new token", async () => {
      const response = await request(app)
        .get(`/recipes/${recipe._id}`)
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.status).toEqual(401);
    });

    test("returns no recipe data", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.body.recipeData).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const response = await request(app).get(`/recipes/${recipe._id}`);
      expect(response.body.token).toEqual(undefined);
    });
  });
});

describe("Get Recipes tests", () => {
  const ownerId = new mongoose.Types.ObjectId();
  const currentDate = new Date();
  const recipe1 = new Recipe({
    name: "test_recipe",
    description: "test_description",
    ownerId: ownerId,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: 20,
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });
  const recipe2 = new Recipe({
    name: "test_recipe2",
    description: "test_description",
    ownerId: ownerId,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: 20,
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });

  const ownerId2 = new mongoose.Types.ObjectId();
  const recipe3 = new Recipe({
    name: "test_recipe3",
    description: "test_description",
    ownerId: ownerId2,
    tags: ["test_tag_one", "test_tag_two"],
    favouritedByOwner: false,
    totalTime: 20,
    recipeYield: 1,
    recipeIngredient: ["test_ingredient_one", "test_ingredient_two"],
    recipeInstructions: ["test_instruction_one", "test_instruction_two"],
    url: "test_url",
    image: "test_url",
    dateAdded: currentDate,
  });

  beforeAll(async () => {
    await recipe1.save();
    await recipe2.save();
    await recipe3.save();
    token = createToken(ownerId);
  });

  afterAll(async () => {
    await Recipe.deleteMany({});
  });

  describe("GET - all recipes - when token is present", () => {
    test("reponse code is 200, returns a new token, recipes match userID and returned recipes are correct", async () => {
      const response = await request(app)
        .get(`/recipes/myrecipes/${ownerId}`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody = response.body;
      const newDecodedToken = JWT.decode(
        responseBody.token,
        process.env.JWT_SECRET
      );
      const oldDecodedToken = JWT.decode(token, process.env.JWT_SECRET);

      // Returns a token
      expect(newDecodedToken.iat > oldDecodedToken.iat).toEqual(true);

      // Response code is 200
      expect(response.status).toEqual(200);

      // Returned data is correct
      expect(responseBody).toHaveProperty("recipes");
      expect(responseBody.recipes.length).toBe(2);

      expect(responseBody.recipes[0]).toEqual(
        // In the test, we are comparing JSON data to a MongoDB object
        // Problem - comparing a date object, MongoDB's ObjectID to strings
        // .toObject is a Mongoose method and it can take the "transform" function.
        // Transform allows you to adjust how you want things to transform.
        // In this case, we are transforming objects to strings.
        // Transform takes two args which are 'doc' (the original document) &
        // 'ret'(return) which is what .toObject will return after the conversion.
        // In the below code, I'm changing the specific fields to strings.
        recipe1.toObject({
          transform: (doc, ret) => {
            ret.dateAdded = ret.dateAdded.toISOString();
            ret._id = ret._id.toString();
            ret.ownerId = ret.ownerId.toString();
          },
        })
      );
      expect(responseBody.recipes[1]).toEqual(
        recipe2.toObject({
          transform: (doc, ret) => {
            ret.dateAdded = ret.dateAdded.toISOString();
            ret._id = ret._id.toString();
            ret.ownerId = ret.ownerId.toString();
          },
        })
      );
    });
    test("Doesn't return the wrong recipe for the userID", async () => {
      const response = await request(app)
        .get(`/recipes/myrecipes/${ownerId}`)
        .set("Authorization", `Bearer ${token}`);

      const responseBody = response.body;

      //Returned recipes are only for user1(ownerId)
      expect(responseBody.recipes[0].ownerId).toEqual(ownerId.toString());
      expect(responseBody.recipes[1].ownerId).toEqual(ownerId.toString());
      //Returned recipes don't belong to user2(ownerId2)
      expect(responseBody.recipes[0].ownerId).not.toEqual(ownerId2.toString());
      expect(responseBody.recipes[1].ownerId).not.toEqual(ownerId2.toString());
    });
  });

  describe("GET - all recipes - when token is missing", () => {
    test("response code is 401, returns no posts, and doesn't return a new token", async () => {
      const response = await request(app).get(`/recipes/${ownerId}`);

      expect(response.status).toEqual(401);
      expect(response.body.recipes).toEqual(undefined);
      expect(response.body.token).toEqual(undefined);
    });
  });
});

const mockRecipeData = {
  recipe_data: {
    "@context": "https://schema.org",
    "@type": "Recipe",
    recipeInstructions: [
      "Preheat oven to 170C.",
      "Beat the eggs in a large bowl until combined. Add the flour and beat until smooth, then add zucchini, onion, bacon, cheese and oil and stir to combine.",
      "Grease and line a 30 x 20cm lamington pan. Pour into the prepared pan and bake in oven for 30 minutes or until cooked through.",
    ],
    recipeIngredient: [
      "5 Free Range Eggs",
      "150g (1 cup) White Self Raising Flour, sifted",
      "375g zucchini, grated",
      "1 large onion, finely chopped",
      "200g rindless bacon, chopped",
      "250.00 ml grated cheddar cheese",
      "60ml (1/4 cup) vegetable oil",
    ],
    cookTime: "PT30M",
    prepTime: "PT15M",
    totalTime: "PT45M",
    recipeYield: 15,
    nutrition: {
      "@context": "https://schema.org",
      "@type": "NutritionInformation",
      calories: "44.03 calories",
      fatContent: "13.2 grams fat",
      saturatedFatContent: "4.3 grams saturated fat",
      carbohydrateContent: "9.5 grams carbohydrates",
      sugarContent: "1.2 grams sugar",
      proteinContent: "6.7 grams protein",
      cholesterolContent: "71.1 milligrams cholesterol",
      sodiumContent: "281.9 milligrams sodium",
    },
    aggregateRating: {
      "@context": "https://schema.org",
      "@type": "AggregateRating",
      ratingCount: 1045,
      ratingValue: 4.8,
    },
    recipeCategory: "lunch, main",
    keywords:
      "slice, bake, cheese, zucchini, bacon, kid friendly, family friendly, easy, budget friendly, lunch box, dinner, lunch, main, snack, everyday, simple, budget, cheap, lunch-box, spring, low carb, low kilojoule, low sugar, video, zuchinni, egg allergy, gluten allergy, lactose allergy, milk allergy, soy allergy, wheat allergy",
    name: "Zucchini slice",
    identifier: "eb7eed59-5f53-4f6f-bfb5-9b7e3f81a702",
    description: "How to make our top-rated zucchini slice recipe of all time.",
    datePublished: "2017-01-21",
    dateCreated: "2006-08-25",
    mainEntityOfPage:
      "//www.taste.com.au/recipes/zucchini-slice/eb7eed59-5f53-4f6f-bfb5-9b7e3f81a702",
    dateModified: "2024-02-22",
    author: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Artarmon Public School",
    },
    publisher: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "taste",
      logo: {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        url: "https://www.taste.com.au/assets/static/site-logos/taste.jpg",
        width: 450,
        height: 112,
      },
    },
    image: {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      url: "https://img.taste.com.au/kQQ4Ruqi/taste/2016/11/zucchini-slice-10160-1.jpeg",
      width: 1980,
      height: 1320,
    },
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "5348771529001-5423680199001",
      description: "5348771529001-5423680199001",
      thumbnailUrl:
        "https://img.taste.com.au/kQQ4Ruqi/taste/2016/11/zucchini-slice-10160-1.jpeg",
      uploadDate: "2016-11-18",
      embedUrl:
        "https://resources.newscdn.com.au/cs/video/vjs/stable/build/index.html?id=5348771529001-5423680199001&=domain=taste",
      contentUrl:
        "https://resources.newscdn.com.au/cs/video/vjs/stable/build/index.html?id=5348771529001-5423680199001&=domain=taste",
    },
  },
};

// REMEMBER TO GET RID OF .only AFTER FINISHING TESTING / WRITING
describe.only("extract recipe info function", () => {
  // test is running but I'm getting back:
  // Object instead of image url
  // totalTime: NaN
  test("extractedRecipeInfo correctly extracts key-value pairs", () => {
    const expectedExtractedInfo = {
      name: "Zucchini slice",
      description:
        "How to make our top-rated zucchini slice recipe of all time.",
      recipeYield: 15,
      tags: [
        "slice",
        "bake",
        "cheese",
        "zucchini",
        "bacon",
        "kid friendly",
        "family friendly",
        "easy",
        "budget friendly",
        "lunch box",
        "dinner",
        "lunch",
        "main",
        "snack",
        "everyday",
        "simple",
        "budget",
        "cheap",
        "lunch-box",
        "spring",
        "low carb",
        "low kilojoule",
        "low sugar",
        "video",
        "zuchinni",
        "egg allergy",
        "gluten allergy",
        "lactose allergy",
        "milk allergy",
        "soy allergy",
        "wheat allergy",
      ],
      totalTime: 45,
      recipeIngredient: [
        "5 Free Range Eggs",
        "150g (1 cup) White Self Raising Flour, sifted",
        "375g zucchini, grated",
        "1 large onion, finely chopped",
        "200g rindless bacon, chopped",
        "250.00 ml grated cheddar cheese",
        "60ml (1/4 cup) vegetable oil",
      ],
      recipeInstructions: [
        "Preheat oven to 170C.",
        "Beat the eggs in a large bowl until combined. Add the flour and beat until smooth, then add zucchini, onion, bacon, cheese and oil and stir to combine.",
        "Grease and line a 30 x 20cm lamington pan. Pour into the prepared pan and bake in oven for 30 minutes or until cooked through.",
      ],
      mainEntityOfPage:
        "//www.taste.com.au/recipes/zucchini-slice/eb7eed59-5f53-4f6f-bfb5-9b7e3f81a702",
      image:
        "https://img.taste.com.au/kQQ4Ruqi/taste/2016/11/zucchini-slice-10160-1.jpeg",
    };

    const extractedInfo = extractRecipeInfo(mockRecipeData);

    expect(extractedInfo).toEqual(expectedExtractedInfo);
  });
});

// "recipe_data": {
//     "@context": "https://schema.org",
//     "@id": "https://www.bbcgoodfood.com/recipes/best-ever-chocolate-brownies-recipe#Recipe",
//     "@type": "Recipe",
//     "description": "A super easy brownie recipe for a squidgy chocolate bake. Watch our foolproof recipe video to help you get a perfect traybake every time.",
//     "image": {
//         "@type": "ImageObject",
//         "height": 574,
//         "url": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001464_11-ed687dd.jpg?resize=768,574",
//         "width": 768
//     },
//     "mainEntityOfPage": {
//         "@type": "WebPage",
//         "@id": "https://www.bbcgoodfood.com/recipes/best-ever-chocolate-brownies-recipe"
//     },
//     "name": "Best ever chocolate brownies recipe",
//     "url": "https://www.bbcgoodfood.com/recipes/best-ever-chocolate-brownies-recipe",
//     "author": [
//         {
//             "@type": "Person",
//             "name": "Orlando Murrin",
//             "url": "https://www.bbcgoodfood.com/author/orlandomurrin"
//         }
//     ],
//     "dateModified": "2024-02-14T10:21:22+00:00",
//     "datePublished": "2012-07-06T10:21:34+01:00",
//     "headline": "Best ever chocolate brownies recipe",
//     "keywords": "Best, Best-ever, Brownies, Chocolate, Cocoa powder, Dark chocolate, Ever, Golden caster sugar, Large egg, Large eggs, Milk chocolate, Murrin, Orlando Murrin, Romantic, Special occasion, Valentines Day, Valentines dessert, Valentines dinner, Valentines pudding, White chocolate",
//     "publisher": {
//         "@type": "Organization",
//         "name": "BBC Good Food",
//         "url": "https://www.bbcgoodfood.com",
//         "logo": {
//             "@type": "ImageObject",
//             "height": 70,
//             "url": "https://images.immediate.co.uk/production/volatile/sites/30/2022/12/cropped-GF-logos2022CMYK-PrintUKONLY10-2-434430d-f5051ed.png?resize=265,70",
//             "width": 265
//         }
//     },
//     "isAccessibleForFree": "False",
//     "hasPart": {
//         "@type": "WebPageElement",
//         "isAccessibleForFree": "False",
//         "cssSelector": ".js-piano-locked-content"
//     },
//     "cookTime": "PT35M",
//     "nutrition": {
//         "@type": "NutritionInformation",
//         "calories": "150 calories",
//         "fatContent": "9 grams fat",
//         "saturatedFatContent": "5 grams saturated fat",
//         "carbohydrateContent": "15 grams carbohydrates",
//         "sugarContent": "12 grams sugar",
//         "fiberContent": "1 grams fiber",
//         "proteinContent": "2 grams protein",
//         "sodiumContent": "0.1 milligram of sodium"
//     },
//     "prepTime": "PT25M",
//     "recipeCategory": "Afternoon tea, Dessert, Treat",
//     "recipeCuisine": "American",
//     "recipeIngredient": [
//         "185g unsalted butter",
//         "185g best dark chocolate",
//         "85g plain flour",
//         "40g cocoa powder",
//         "50g white chocolate",
//         "50g milk chocolate",
//         "3 large eggs",
//         "275g golden caster sugar"
//     ],
//     "recipeInstructions": [
//         {
//             "@type": "HowToStep",
//             "text": "Cut 185g unsalted butter into small cubes and tip into a medium bowl. Break 185g dark chocolate into small pieces and drop into the bowl."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Fill a small saucepan about a quarter full with hot water, then sit the bowl on top so it rests on the rim of the pan, not touching the water. Put over a low heat until the butter and chocolate have melted, stirring occasionally to mix them."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Remove the bowl from the pan. Alternatively, cover the bowl loosely with cling film and put in the microwave for 2 minutes on High. Leave the melted mixture to cool to room temperature."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "While you wait for the chocolate to cool, position a shelf in the middle of your oven and turn the oven on to 180C/160C fan/gas 4."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Using a shallow 20cm square tin, cut out a square of kitchen foil (or non-stick baking parchment) to line the base. Tip 85g plain flour and 40g cocoa powder into a sieve held over a medium bowl. Tap and shake the sieve so they run through together and you get rid of any lumps."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Chop 50g white chocolate and 50g milk chocolate into chunks on a board."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Break 3 large eggs into a large bowl and tip in 275g golden caster sugar. With an electric mixer on maximum speed, whisk the eggs and sugar. They will look thick and creamy, like a milk shake. This can take 3-8 minutes, depending on how powerful your mixer is. You’ll know it’s ready when the mixture becomes really pale and about double its original volume. Another check is to turn off the mixer, lift out the beaters and wiggle them from side to side. If the mixture that runs off the beaters leaves a trail on the surface of the mixture in the bowl for a second or two, you’re there."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Pour the cooled chocolate mixture over the eggy mousse, then gently fold together with a rubber spatula. Plunge the spatula in at one side, take it underneath and bring it up the opposite side and in again at the middle. Continue going under and over in a figure of eight, moving the bowl round after each folding so you can get at it from all sides, until the two mixtures are one and the colour is a mottled dark brown. The idea is to marry them without knocking out the air, so be as gentle and slow as you like."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Hold the sieve over the bowl of eggy chocolate mixture and resift the cocoa and flour mixture, shaking the sieve from side to side, to cover the top evenly."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Gently fold in this powder using the same figure of eight action as before. The mixture will look dry and dusty at first, and a bit unpromising, but if you keep going very gently and patiently, it will end up looking gungy and fudgy. Stop just before you feel you should, as you don’t want to overdo this mixing."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Finally, stir in the white and milk chocolate chunks until they’re dotted throughout."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Pour the mixture into the prepared tin, scraping every bit out of the bowl with the spatula. Gently ease the mixture into the corners of the tin and paddle the spatula from side to side across the top to level it."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Put in the oven and set your timer for 25 mins. When the buzzer goes, open the oven, pull the shelf out a bit and gently shake the tin. If the brownie wobbles in the middle, it’s not quite done, so slide it back in and bake for another 5 minutes until the top has a shiny, papery crust and the sides are just beginning to come away from the tin. Take out of the oven."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "Leave the whole thing in the tin until completely cold, then, if you’re using the brownie tin, lift up the protruding rim slightly and slide the uncut brownie out on its base. If you’re using a normal tin, lift out the brownie with the foil (or parchment). Cut into quarters, then cut each quarter into four squares and finally into triangles."
//         },
//         {
//             "@type": "HowToStep",
//             "text": "They’ll keep in an airtight container for a good two weeks and in the freezer for up to a month."
//         }
//     ],
//     "recipeYield": "Cuts into 16 squares or 32 triangles",
//     "totalTime": "PT1H"
// }
// }
