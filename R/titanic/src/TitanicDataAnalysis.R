# Load data from csv files
train <- read.csv("data/train.csv", header = TRUE)
test <- read.csv("data/test.csv", header = TRUE)

# Test data doesn't have the 'survived' variable.
# Add it in order to combine the data
test.survived = data.frame(
  Survived = rep("None", nrow(test)),
  test[,]
)

# Combine data sets
data.combined <- rbind(train, test.survived)

data.combinedSurvived <- as.factor(data.combined$Survived)
data.combinedPClass <- as.factor(data.combined$Pclass)

# Load library for visualizations
library(ggplot2)

# Hypothesis - Rich people survive at a higher rate
# Check in the train set, which has the 'Survive' variable

ggplot(
    train,
    aes(x = Pclass, fill = factor(train$Survived))
    ) +
    geom_bar(width = 0.5) +
    xlab("Pclass") +
    ylab("Total count") + 
    labs(fill = "Survived")


