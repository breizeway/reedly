"""create feeds table

Revision ID: 66cdd0b95251
Revises: ffdc0a98111c
Create Date: 2021-03-19 17:10:02.774082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66cdd0b95251'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('feeds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('feed_name', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('feeds')
    # ### end Alembic commands ###