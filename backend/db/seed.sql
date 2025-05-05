-- Insert sample customers
INSERT INTO customers (name, email, password) VALUES ('Andreas', 'andreas@mail.com', 'funny123');
INSERT INTO customers (name, email, password) VALUES ('Anne', 'anne@mail.com', 'simplepass');
INSERT INTO customers (name, email, password) VALUES ('Anton', 'anton@mail.com', 'password1');
INSERT INTO customers (name, email, password) VALUES ('Sebastian', 'sebastian@mail.com', 'qwerty');
INSERT INTO customers (name, email, password) VALUES ('Emil', 'emil@mail.com', 'emil123');

INSERT INTO products (id, name, img, description, fullDescription, category, popular, price, brand) VALUES
(1, "Taco Hat", "/images/taco-hat.png", "Beautiful taco hat for parties and stuff", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fun", 1, 500, "Gucci"),
(2, "Captain", "/images/Kaptajn.jpg", "Traditional headpiece for the born sailor", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Outdoor", 1, 500, "Gucci"),
(3, "Strawberry", "/images/Strawberry.png", "Cute headpiece with a summer feeling", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Kids", 1, 500, "Gucci"),
(4, "Sixpence Cap", "/images/SixPence.png", "A classic flat cap with a rounded crown, often worn in British working-class fashion", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Classic", 1, 500, "Gucci"),
(5, "Victorian Tophat", "/images/VictorianTophat.png", "A tall, elegant hat with a flat crown, popular in the 19th century", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Classic", 1, 500, "Gucci"),
(6, "Adventure Hat", "/images/AdventureHat.png", "A tall, elegant hat with a flat crown, popular in the 19th century", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Outdoor", 1, 500, "Gucci"),
(7, "Emoji Hat", "/images/ShitHat.png", "When life gives you...", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fun", 0, 500, "Prada"),
(8, "Diamont cap", "/images/diamont-cap.jpg", "When you want to shine", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fashion", 0, 99999, "Prada"),
(9, "Fishing hat with fish", "/images/Fish-hat.jpg", "A lucky hat for your fishing trip", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Outdoor", 0, 1, "Prada"),
(10, "Pink cowboy", "/images/Pink-cowboy.jpg", "When you feel like a pink cowboy", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fashion", 0, 149, "Prada"),
(11, "Red hat", "/images/red-hat.jpg", "This is a hat that is red. Buy it if you want to", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fashion", 0, 250, "Prada"),
(12, "Cat hat", "/images/hat-for-cat.jpg", "If you have a cat, buy a hat for the cat", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fun", 0, 99, "Von Dutch"),
(13, "Graduation hat", "/images/graduation-hat.png", "Show off your knowledge with this hat on your head", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Classic", 0, 315, "Von Dutch"),
(14, "Bamboo hat", "/images/bamboo-hat.jpg", "A hat made of bamboo. Perfect for the summer, or if you like bamboo, or both", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Outdoor", 0, 101, "Von Dutch"),
(15, "Windy hat", "/images/windy-hat.png", "A hat that is perfect for windy days. It will not fly off your head. Probably, we have not tested it", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Outdoor", 0, 299, "Von Dutch"),
(16, "Chicken hat", "/images/chick-hat.jpg", "A hat that looks like a chicken. Perfect for the chicken lover in your life. Or if you are a chicken. Or if you just like chickens", 
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...", "Fun", 0, 9, "Von Dutch");

INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '2', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('1', '3', '3');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('2', '1', '1');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('3', '1', '4');
INSERT INTO basketEntries (customer_id, product_id, quantity) VALUES ('3', '2', '1');
