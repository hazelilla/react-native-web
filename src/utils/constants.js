import { 
    GroceriesMobileSvg, 
    BakingSvg, 
    BeverageSvg, 
    DairySvg, 
    DessertSvg, 
    FruitsSvg, 
    GrainsSvg, 
    HomeCareSvg, 
    LettuceSvg, 
    MeatSvg, 
    OthersSvg, 
    PersonalSvg, 
    SauceSvg, 
    SeaFoodSvg, 
    SnacksSvg, 
    VegetablesSvg 
} from '../assets/svgs';

const berryImage = require('../assets/images/berry.png');
const strawberryImage = require('../assets/images/strawberry.png');
const cherryImage = require('../assets/images/cherry.png');
const coconutImage = require('../assets/images/coconut.png');
const papayaImage = require('../assets/images/papaya.png');
const apricotImage = require('../assets/images/apricot.png');


export const categoryImages = {
    Fruits: [berryImage, strawberryImage, cherryImage, coconutImage, papayaImage, apricotImage],
};

export const categories = {
    All: 'All',
    Fruits: 'Fruits',
    Veggies: 'Veggies',
    Dairy: 'Dairy',
    BakedGoods: 'Baked Goods',
    Meat: 'Meat',
    Grains: 'Grains',
    Beverages: 'Beverages',
    Snacks: 'Snacks',
    Condiments: 'Condiments',
    Seafood: 'Seafood',
    Desserts: 'Desserts',
    Personal: 'Personal Care',
    Home: 'Home Care',
    Others: 'Others',
};

export const subCategories = {
    Fruits: ['Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry'],
    Veggies: ['Carrot', 'Broccoli', 'Spinach', 'Tomato'],
    Dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
    "Baked Goods": ['Bread', 'Cake', 'Cookies', 'Muffins', 'Croissant', 'Donuts'],
    Meat: ['Beef', 'Chicken', 'Fish', 'Turkey', 'Lamb'],
    Grains: ['Oats', 'Rice', 'Quinoa', 'Barley'],
    Beverages: ['Tea', 'Coffee', 'Juice', 'Soda', 'Water'],
    Snacks: ['Chips', 'Chocolate', 'Candies', 'Nuts', 'Popcorn', 'Pretzels', 'Crackers', 'Granola Bars'],
    Condiments: ['Ketchup', 'Mustard', 'Mayonnaise', 'Soy Sauce', 'BBQ Sauce'],
    Seafood: ['Shrimp', 'Salmon', 'Tuna', 'Cod', 'Crab'],
    Desserts: ['Ice Cream', 'Cake', 'Cheesecake', 'Pudding', 'Pie'],
    "Personal Care": ['Shampoo', 'Soap', 'Toothpaste', 'Deodorant', 'Lotion', 'Shaving Cream'],
    "Home Care": ['Detergent', 'Cleaner', 'Soap', 'Sponge', 'Trash Bags'],
    Others: ['Stationery', 'Pet Supplies', 'Electronics', 'Tools', 'Party Supplies']
};

export const categoryIcons = {
    All: <GroceriesMobileSvg width={40} height={40} />,
    "Baked Goods": <BakingSvg width={40} height={40} />,
    Beverages: <BeverageSvg width={40} height={40} />,
    Dairy: <DairySvg width={40} height={40} />,
    Desserts: <DessertSvg width={40} height={40} />,
    Fruits: <FruitsSvg width={40} height={40} />,
    Grains: <GrainsSvg width={40} height={40} />,
    "Home Care": <HomeCareSvg width={40} height={40} />,
    Lettuce: <LettuceSvg width={40} height={40} />,
    Meat: <MeatSvg width={40} height={40} />,
    Others: <OthersSvg width={40} height={40} />,
    "Personal Care": <PersonalSvg width={40} height={40} />,
    Condiments: <SauceSvg width={40} height={40} />,
    Seafood: <SeaFoodSvg width={40} height={40} />,
    Snacks: <SnacksSvg width={40} height={40} />,
    Veggies: <VegetablesSvg width={40} height={40} />,
};
