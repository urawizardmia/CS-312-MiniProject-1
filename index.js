import express from "express";

const app = express();
const port = 3000;

// for storing all the recipes
var recipes = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        recipes: recipes,
        category: "all",
    });
});

app.get("/new_recipe", (req, res) => {
    res.render("newRecipe.ejs");
});

// this is the form info for new recipes, makes a new one and puts it in the recipe array
app.post("/submit", (req, res) => {
    const recipe = {
        recipe_name: req.body["recipe_name"],
        your_name: req.body["your_name"],
        cook_time: req.body["cook_time"],
        serving_size: req.body["serving_size"],
        category: req.body["category"],
        ingredients: req.body["ingredients"],
        steps: req.body["steps"],
        date: new Date(),
    };

    recipes.push(recipe);

    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const number = req.body["number"]; // the index for each recipe
    const recipe = recipes[number]; // gets the recipe you clicked on so you can edit it

    res.render("edit.ejs", {
        recipe: recipe,
        number: number,
    });
});

app.post("/save", (req, res) => {
    const number = req.body["number"];

    const recipe = {
        recipe_name: req.body["recipe_name"],
        your_name: req.body["your_name"],
        cook_time: req.body["cook_time"],
        serving_size: req.body["serving_size"],
        category: req.body["category"],
        ingredients: req.body["ingredients"],
        steps: req.body["steps"],
        date: recipes[number].date,
    };
    // need to replace the old recipe with the edited one
    recipes[number] = recipe;

    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const number = req.body["number"];

    // removes the recipe from the index (number)
    recipes.splice(number, 1);

    res.redirect("/");
});

app.post("/filter", (req, res) => {
    const category = req.body["category"];

    console.log(category);

    res.render("index.ejs", {
        recipes: recipes,
        category: category,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
