-- Insert sample customers
INSERT INTO customers (name, email, password) VALUES ('Andreas', 'andreas@mail.com', 'funny123');
INSERT INTO customers (name, email, password) VALUES ('Anne', 'anne@mail.com', 'simplepass');
INSERT INTO customers (name, email, password) VALUES ('Anton Moller', 'anton@mail.com', 'password1');
INSERT INTO customers (name, email, password) VALUES ('Sebastian', 'sebastian@mail.com', 'qwerty');
INSERT INTO customers (name, email, password) VALUES ('Emil', 'emil@mail.com', 'emil123');
INSERT INTO customers (name, email, password) VALUES ('guest', 'guest', 'guest');

INSERT INTO products (id, name, img, description, fullDescription, category, popular, price, brand, color) VALUES
(1, "Taco Hat", "/images/taco-hat.png", "Beautiful taco hat for parties and stuff", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fun", 1, 500, "Gucci", "Yellow"),
(2, "Captain", "/images/Kaptajn.jpg", "Traditional headpiece for the born sailor", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
   "Outdoor", 1, 500, "Gucci", "White"),
(3, "Strawberry", "/images/Strawberry.png", "Cute headpiece with a summer feeling", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Kids", 1, 500, "Gucci", "Red"),
(4, "Sixpence Cap", "/images/SixPence.png", "A classic flat cap with a rounded crown, often worn in British working-class fashion", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Classic", 1, 500, "Gucci", "Brown"),
(5, "Victorian Tophat", "/images/VictorianTophat.png", "A tall, elegant hat with a flat crown, popular in the 19th century", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Classic", 1, 500, "Gucci", "Black"),
(6, "Adventure Hat", "/images/AdventureHat.png", "A tall, elegant hat with a flat crown, popular in the 19th century", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Outdoor", 1, 500, "Gucci", "Green"),
(7, "Emoji Hat", "/images/ShitHat.png", "When life gives you", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fun", 0, 500, "Prada", "Brown"),
(8, "Diamont cap", "/images/diamont-cap.jpg", "When you want to shine", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fashion", 0, 99999, "Prada", "Blue"),
(9, "Fishing hat with fish", "/images/Fish-hat.jpg", "A lucky hat for your fishing trip", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Outdoor", 0, 1, "Prada", "Red"),
(10, "Pink cowboy", "/images/Pink-cowboy.jpg", "When you feel like a pink cowboy", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fashion", 0, 149, "Prada", "Pink"),
(11, "Red hat", "/images/red-hat.jpg", "This is a hat that is red. Buy it if you want to", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fashion", 0, 250, "Prada", "Red"),
(12, "Cat hat", "/images/hat-for-cat.jpg", "If you have a cat, buy a hat for the cat", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Fun", 0, 99, "Von Dutch", "Pink"),
(13, "Graduation hat", "/images/graduation-hat.png", "Show off your knowledge with this hat on your head", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Classic", 0, 315, "Von Dutch", "Red"),
(14, "Bamboo hat", "/images/bamboo-hat.jpg", "A hat made of bamboo. Perfect for the summer, or if you like bamboo, or both", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Outdoor", 0, 101, "Von Dutch", "Yellow"),
(15, "Windy hat", "/images/windy-hat.png", "A hat that is perfect for windy days. It will not fly off your head. Probably, we have not tested it", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Outdoor", 0, 299, "Von Dutch", "Blue"),
(16, "Chicken hat", "/images/chick-hat.jpg", "A hat that looks like a chicken. Perfect for the chicken lover in your life. Or if you are a chicken. Or if you just like chickens", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
   "Fun", 0, 9, "Von Dutch", "Yellow");

INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('andreas@mail.com', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('andreas@mail.com', '2', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('andreas@mail.com', '3', '3');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('anne@mail.com', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('anton@mail.com', '1', '4');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('anton@mail.com', '2', '1');
